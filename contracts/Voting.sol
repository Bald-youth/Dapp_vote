// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    address public owner;
    mapping(address => bool) public voted;  // 记录每个用户是否已经投票
    Candidate[] public candidates;

    constructor() {
        owner = msg.sender;
    }

    // 只有合约拥有者可以添加候选人
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // 添加候选人
    function addCandidate(string memory name) public onlyOwner {
        candidates.push(Candidate(name, 0));
    }

    // 获取候选人数量
    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // 投票
    function vote(uint candidateIndex) public {
        require(candidateIndex < candidates.length, "Invalid candidate");
        require(!voted[msg.sender], "You have already voted");

        // 标记该地址为已投票
        voted[msg.sender] = true;

        // 增加候选人的投票数
        candidates[candidateIndex].voteCount++;
    }

    // 检查用户是否已投票
    function hasVoted(address user) public view returns (bool) {
        return voted[user];
    }
}
