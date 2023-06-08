export async function connectWalletHandler(displayDialog, setCurrenAccount) {
  try {
    const { ethereum } = window;
    if (!ethereum) displayDialog(true);
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length && setCurrenAccount) setCurrenAccount(accounts[0]);
  } catch (e) {
    console.log(e);
  }
}
