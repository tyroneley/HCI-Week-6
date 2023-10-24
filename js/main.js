let balance = 10000;
let account_number = 0;
let passcode = 0;
let receipts = []

function validatePasscode(temp_passcode) {
    if (temp_passcode.length == 6) {
        return true;
    } else {
        return false;
    }
}

function addWalletElements() {
    const account_num_text = document.getElementById("account_number_display")
    const balance_text = document.getElementById("balance_display")
    
    account_num_text.textContent = account_number;
    balance_text.textContent = balance;
}

function loadWallet() {
    window.location.href = "wallet.html"
    window.addEventListener('load', addWalletElements)
}

function addHistoryElements() {
    const history = document.getElementById("transaction_list")
    for (receipt in receipts) {
        const event = document.createElement("li");
        event.textContent = "Sent " + receipt[1] + " to " + receipt[2];
        history.appendChild(event);
    }
}

function loadHistory() {
    window.location.href = "history.html"
    window.addEventListener('load', addHistoryElements)
}

function addReceipt(amount, recipient) {
    let receipt = [amount, recipient]
    receipts.push(receipt)
}

function login() {
    const account_num = document.getElementById("account_number_login").value;
    const passcode_login = document.getElementById("passcode_login").value;

    if (passcode_login == null && account_num == null) {
        alert("Please enter your login details!")
    } else if (passcode_login.length == 6 && account_num.length == 10) {
        alert("Successfully logged in")
        account_number = account_num;
        passcode = passcode_login;
        window.location.href = "banking.html";
    } else {
        alert("Invalid login details. Your passcode should be 6 digits long and account number 10 digits long")
    }
}

function transfer() {
    const amountToTransfer = parseFloat(document.getElementById("transfer_amount").value)
    const transferRecipient = parseFloat(document.getElementById("transfer_recipient").value)
    
    if (isNaN(amountToTransfer) && isNaN(transferRecipient)) {
        alert("Invalid transfer amount and/or account number.")
    } else if (balance < amountToTransfer) {
        alert("Insufficient funds. Check wallet")
    } else {
        const passcodeRequest = prompt("Enter your 6 digit passcode that you used earlier")
        if (validatePasscode(passcodeRequest)) {
            balance -= amountToTransfer
            addReceipt(amountToTransfer, transferRecipient)
            alert("Transfer successful")
            window.location.href = "banking.html"
        } else {
            alert("Transfer failed")
        }
    }
}