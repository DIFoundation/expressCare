// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {FHE, euint32, ebool} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {Escrow} from "./Escrow.sol";

/**
 * @title Auction
 * @notice Sealed-bid auction using FHE (Zama)
 * @dev Bids are encrypted and highest bid is computed privately
 */
contract Auction is ZamaEthereumConfig {
    // ============ Errors ============
    error Auction__NotSeller();
    error Auction__AuctionNotFound();
    error Auction__AuctionEnded();
    error Auction__AuctionNotEnded();
    error Auction__AlreadyResolved();
    error Auction__Unauthorized();
    error Auction__NoBids();
    error Auction__EscrowNotSet();

    // ============ Structs ============
    struct AuctionData {
        uint256 productId;
        address seller;
        uint256 endTime;
        bool resolved;
    }

    // ============ State ============
    uint256 public auctionCounter;
    Escrow public escrowContract;
    address public marketplace;
    address public owner;
    uint256 public winningAmount;

    mapping(uint256 => AuctionData) public auctions;

    // Encrypted bids
    mapping(uint256 => euint32[]) private bids;

    // Track bidders
    mapping(uint256 => address[]) private bidders;

    // Winner tracking
    mapping(uint256 => address) public winner;

    // ============ Events ============
    event AuctionCreated(
        uint256 indexed auctionId,
        uint256 indexed productId,
        address seller,
        uint256 endTime
    );

    event BidPlaced(
        uint256 indexed auctionId,
        address bidder
    );

    event AuctionResolved(
        uint256 indexed auctionId,
        address winner
    );

    // ============ Modifiers ============
    modifier onlyOwner() {
        if (msg.sender != owner) revert Auction__Unauthorized();
        _;
    }

    modifier auctionExists(uint256 _auctionId) {
        if (auctions[_auctionId].seller == address(0))
            revert Auction__AuctionNotFound();
        _;
    }

    // ============ Constructor ============
    constructor(address payable _escrow, address _marketplace) {
        owner = msg.sender;
        escrowContract = Escrow(_escrow);
        marketplace = _marketplace;
    }

    // ============ Create Auction ============
    function createAuction(
        uint256 _productId,
        uint256 _duration
    ) external returns (uint256 auctionId) {
        if (_duration == 0) revert Auction__AuctionEnded();
        if (msg.sender != marketplace.product(_productId).seller) revert Auction__Unauthorized();

        auctionCounter++;
        auctionId = auctionCounter;

        auctions[auctionId] = AuctionData({
            productId: _productId,
            seller: msg.sender,
            endTime: block.timestamp + _duration,
            resolved: false
        });

        emit AuctionCreated(
            auctionId,
            _productId,
            msg.sender,
            block.timestamp + _duration
        );
    }

    // ============ Place Encrypted Bid ============
    function placeBid(
        uint256 _auctionId,
        euint32 _encryptedBid
    ) external auctionExists(_auctionId) {

        if (block.timestamp >= auctions[_auctionId].endTime)
            revert Auction__AuctionEnded();
            
        bids[_auctionId].push(_encryptedBid);
        bidders[_auctionId].push(msg.sender);

        emit BidPlaced(_auctionId, msg.sender);
    }

    function revealBid(
        uint256 _auctionId,
        uint32 _bid
    ) external {
        // Compare revealed bid with encrypted highest
        euint32 encBid = FHE.asEuint32(_bid);

        // You can later match via off-chain verification or simplified logic
    }

    // ============ Resolve Auction (FHE MAGIC) ============
    function resolveAuction(uint256 _auctionId) external auctionExists(_auctionId) {
        AuctionData storage auction = auctions[_auctionId];
        
        if (block.timestamp < auction.endTime) revert Auction__AuctionNotEnded();
        if (auction.resolved) revert Auction__AlreadyResolved();
        
        uint256 length = bids[_auctionId].length;
        if (length == 0) revert Auction__NoBids();

        // Track both highest value AND winner index
        euint32 highestBid = bids[_auctionId][0];
        uint256 winnerIdx = 0;
        
        // Store comparison results for index tracking
        for (uint256 i = 1; i < length; i++) {
            ebool isGreater = FHE.gt(bids[_auctionId][i], highestBid);
            
            // Update highest bid
            highestBid = FHE.select(isGreater, bids[_auctionId][i], highestBid);
            
            // Track index (requires FHE.decrypt or different approach)
            // This is the hard part with FHE - you can't branch on encrypted values
        }
        
        // NOTE: With pure FHE, you cannot determine winner index without 
        // revealing some information. Consider using Zama's gateway for 
        // conditional decryption or a different approach.
        
        winner[_auctionId] = bidders[_auctionId][winnerIdx];
        auction.resolved = true;
        
        emit AuctionResolved(_auctionId, winner[_auctionId]);
    }

    // ============ Winner Proceeds to Escrow ============
    function finalizeAuction(
        uint256 _auctionId
    ) external payable auctionExists(_auctionId) {
        AuctionData storage auction = auctions[_auctionId];

        if (!auction.resolved) revert Auction__AuctionNotEnded();
        if (msg.sender != winner[_auctionId])
            revert Auction__Unauthorized();
        require(msg.value == winningAmount, "Invalid amount");

        // Winner pays (plaintext ETH)
        uint256 escrowId = escrowContract.createEscrow{value: msg.value}(
            msg.sender,
            auction.seller,
            auction.productId,
            _auctionId
        );


    }

    // ============ View ============
    function getBidders(
        uint256 _auctionId
    ) external view returns (address[] memory) {
        return bidders[_auctionId];
    }
}