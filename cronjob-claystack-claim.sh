# m h  dom mon dow   command
0 */2 * * * node ~/claystack/faucet.js
0 */3 * * * node ~/claystack/deposit.js
0 */4 * * * node ~/claystack/withdraw.js
#0 */4 * * * node ~/claystack/claim.js