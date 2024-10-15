export type Lottery = {
  "version": "0.1.0",
  "name": "lottery",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lotteryPdakeyInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "withdrawTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createLottery",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lotteryPdakeyInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "timeFrameIndex",
          "type": "u8"
        },
        {
          "name": "timeFrame",
          "type": "u64"
        },
        {
          "name": "ticketPrice",
          "type": "u8"
        },
        {
          "name": "maxTicket",
          "type": "u64"
        },
        {
          "name": "devFee",
          "type": "u32"
        }
      ]
    },
    {
      "name": "buyTicket",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "count",
          "type": "u8"
        }
      ]
    },
    {
      "name": "endLottery",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "taxTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "prizeDistribution",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner1TokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner2TokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner3TokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setReferral",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "referralLink",
          "type": "string"
        }
      ]
    },
    {
      "name": "addReferralUser",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "referralUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "getUserTicket",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": "bool"
    },
    {
      "name": "joinLottery",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "globalAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "isInitialized",
            "type": "u8"
          },
          {
            "name": "poolTokeAccount",
            "type": "publicKey"
          },
          {
            "name": "withdrawTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "publicKey"
          },
          {
            "name": "spot",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "referralLink",
            "type": "string"
          },
          {
            "name": "referrer",
            "type": "publicKey"
          },
          {
            "name": "referralList",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "lottery",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "timeFrame",
            "type": "u64"
          },
          {
            "name": "ticketPrice",
            "type": "u8"
          },
          {
            "name": "maxTicket",
            "type": "u64"
          },
          {
            "name": "devFee",
            "type": "u32"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "participants",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "winner",
            "type": {
              "array": [
                "publicKey",
                3
              ]
            }
          },
          {
            "name": "prizePercent",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          },
          {
            "name": "winnerPrize",
            "type": {
              "array": [
                "u64",
                3
              ]
            }
          },
          {
            "name": "realPoolAmount",
            "type": "u64"
          },
          {
            "name": "realCount",
            "type": "u32"
          },
          {
            "name": "round",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "lotteryPdaInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u8"
          },
          {
            "name": "rounds",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotOwner",
      "msg": "Invalid Owner"
    },
    {
      "code": 6001,
      "name": "InvalidAddress",
      "msg": "Invalid address."
    },
    {
      "code": 6002,
      "name": "LotteryNotStarted",
      "msg": "Lottery not started"
    },
    {
      "code": 6003,
      "name": "LotteryEnded",
      "msg": "Lottery ended"
    },
    {
      "code": 6004,
      "name": "AlreadyParticipated",
      "msg": "Already participated"
    },
    {
      "code": 6005,
      "name": "LotteryNotEnded",
      "msg": "Lottery not ended"
    },
    {
      "code": 6006,
      "name": "LotteryNotFound",
      "msg": "Lottery not founded"
    },
    {
      "code": 6007,
      "name": "LotteryAlreadyEnded",
      "msg": "Lottery already ended"
    },
    {
      "code": 6008,
      "name": "LotteryAlreadyFulled",
      "msg": "There is no spot"
    },
    {
      "code": 6009,
      "name": "InvalidMintAuthority",
      "msg": "Invalid Mint Authority"
    },
    {
      "code": 6010,
      "name": "ReferralLinkAlreadyExist",
      "msg": "Referral Link Already Exist"
    },
    {
      "code": 6011,
      "name": "ReferralLinkMisMatched",
      "msg": "Referral Link MisMatched"
    },
    {
      "code": 6012,
      "name": "NotEnoughParticipants",
      "msg": "Not Enough Participants"
    },
    {
      "code": 6013,
      "name": "InvalidUserAccount",
      "msg": "Invalid User Account"
    }
  ]
};

export const IDL: Lottery = {
  "version": "0.1.0",
  "name": "lottery",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lotteryPdakeyInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "withdrawTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createLottery",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lotteryPdakeyInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "timeFrameIndex",
          "type": "u8"
        },
        {
          "name": "timeFrame",
          "type": "u64"
        },
        {
          "name": "ticketPrice",
          "type": "u8"
        },
        {
          "name": "maxTicket",
          "type": "u64"
        },
        {
          "name": "devFee",
          "type": "u32"
        }
      ]
    },
    {
      "name": "buyTicket",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "count",
          "type": "u8"
        }
      ]
    },
    {
      "name": "endLottery",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "taxTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "prizeDistribution",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner1TokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner2TokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner3TokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setReferral",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "referralLink",
          "type": "string"
        }
      ]
    },
    {
      "name": "addReferralUser",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "referralUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "getUserTicket",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [],
      "returns": "bool"
    },
    {
      "name": "joinLottery",
      "accounts": [
        {
          "name": "lottery",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "globalAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "isInitialized",
            "type": "u8"
          },
          {
            "name": "poolTokeAccount",
            "type": "publicKey"
          },
          {
            "name": "withdrawTokenAccount",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "publicKey"
          },
          {
            "name": "spot",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "referralLink",
            "type": "string"
          },
          {
            "name": "referrer",
            "type": "publicKey"
          },
          {
            "name": "referralList",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "lottery",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "timeFrame",
            "type": "u64"
          },
          {
            "name": "ticketPrice",
            "type": "u8"
          },
          {
            "name": "maxTicket",
            "type": "u64"
          },
          {
            "name": "devFee",
            "type": "u32"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "state",
            "type": "u8"
          },
          {
            "name": "participants",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "winner",
            "type": {
              "array": [
                "publicKey",
                3
              ]
            }
          },
          {
            "name": "prizePercent",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          },
          {
            "name": "winnerPrize",
            "type": {
              "array": [
                "u64",
                3
              ]
            }
          },
          {
            "name": "realPoolAmount",
            "type": "u64"
          },
          {
            "name": "realCount",
            "type": "u32"
          },
          {
            "name": "round",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "lotteryPdaInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u8"
          },
          {
            "name": "rounds",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotOwner",
      "msg": "Invalid Owner"
    },
    {
      "code": 6001,
      "name": "InvalidAddress",
      "msg": "Invalid address."
    },
    {
      "code": 6002,
      "name": "LotteryNotStarted",
      "msg": "Lottery not started"
    },
    {
      "code": 6003,
      "name": "LotteryEnded",
      "msg": "Lottery ended"
    },
    {
      "code": 6004,
      "name": "AlreadyParticipated",
      "msg": "Already participated"
    },
    {
      "code": 6005,
      "name": "LotteryNotEnded",
      "msg": "Lottery not ended"
    },
    {
      "code": 6006,
      "name": "LotteryNotFound",
      "msg": "Lottery not founded"
    },
    {
      "code": 6007,
      "name": "LotteryAlreadyEnded",
      "msg": "Lottery already ended"
    },
    {
      "code": 6008,
      "name": "LotteryAlreadyFulled",
      "msg": "There is no spot"
    },
    {
      "code": 6009,
      "name": "InvalidMintAuthority",
      "msg": "Invalid Mint Authority"
    },
    {
      "code": 6010,
      "name": "ReferralLinkAlreadyExist",
      "msg": "Referral Link Already Exist"
    },
    {
      "code": 6011,
      "name": "ReferralLinkMisMatched",
      "msg": "Referral Link MisMatched"
    },
    {
      "code": 6012,
      "name": "NotEnoughParticipants",
      "msg": "Not Enough Participants"
    },
    {
      "code": 6013,
      "name": "InvalidUserAccount",
      "msg": "Invalid User Account"
    }
  ]
};
