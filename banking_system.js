class BankAccount {
    #balance; // Properti privat 

    constructor(balance) {
        this.#balance = balance; // Menginisialisasi balance
    }

    deposit(amount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (isNaN(amount)) {
                    reject("Input harus berupa angka");
                    return;
                } else if (amount <= 0) {
                    reject("Input nilai tidak boleh minus atau null");
                } else {
                    amount = parseFloat(amount);
                    this.#balance += amount; // Menggunakan balance privat
                    updateSaldoDisplay(this.#balance);
                    resolve(`Saldo terbaru Anda setelah ditambah adalah: Rp ${this.formatRupiah(this.#balance)}`);
                    console.log(`Saldo terbaru Anda setelah ditambah adalah: Rp ${this.formatRupiah(this.#balance)}`);
                }
            }, 2000); // delay 2 detik
        });
    }

    withdraw(amount) {
        return new Promise((resolve, reject) => {
            Swal.fire({
                text: "Mohon tunggu...",
                position: 'top',
                icon: 'info',
                showConfirmButton: false,
                timerProgressBar: true,
                toast: true,
                customClass: {
                    popup: 'large-toast'
                }
            });
            setTimeout(() => {
                if (amount <= 0) {
                    reject("Input nilai tidak boleh minus atau null");
                } else if (amount > this.#balance) {
                    reject("Saldo tidak cukup");
                } else if (isNaN(amount)) {
                    reject("Input harus berupa angka");
                } else {
                    amount = parseFloat(amount);
                    this.#balance -= amount; // Menggunakan balance privat
                    updateSaldoDisplay(this.#balance);
                    resolve(`Saldo terbaru Anda setelah dikurangi adalah: Rp ${this.formatRupiah(this.#balance)}`);
                    console.log(`Saldo terbaru Anda setelah dikurangi adalah: Rp ${this.formatRupiah(this.#balance)}`);
                }
            }, 2000); // delay 2 detik
        });
    }

    formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID').format(amount);
    }

    getSaldo() {
        return this.#balance; // Mengembalikan balance privat
    }
}

const akunKu = new BankAccount(1000000);

function depositSaldo() {
    let amount = window.prompt("Jumlah yang ingin ditambahkan:");
    akunKu.deposit(amount)
        .then(message => {
            showAlert(message);
        })
        .catch(error => {
            showAlertError(error);
        });
}

function withdrawSaldo() {
    let amount = window.prompt("Jumlah saldo yang dikurangi:");
    akunKu.withdraw(amount)
        .then(message => {
            showAlert(message);
        })
        .catch(error => {
            showAlertError(error);
        });
}

updateSaldoDisplay(akunKu.getSaldo());

function updateSaldoDisplay(saldo) {
    document.getElementById('saldo').innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(saldo);
}

// Fungsi untuk menampilkan alert success
function showAlert(message) {
    Swal.fire({
        text: message,
        position: 'top',
        timer: 3000,
        icon: 'success',
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        customClass: {
            popup: 'large-toast'
        }
    });
}

// Fungsi untuk menampilkan alert error
function showAlertError(error) {
    Swal.fire({
        text: error,
        position: 'top',
        timer: 3000,
        icon: 'error',
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        customClass: {
            popup: 'large-toast'
        }
    });
}
