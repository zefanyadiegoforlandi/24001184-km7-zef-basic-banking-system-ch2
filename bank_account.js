let saldo = 1000000;

function tambahSaldo(){
    let tambahanSaldo = window.prompt("Jumlah yang ingin ditambahkan:");
    if (tambahanSaldo === null) return;
    tambahanSaldo = parseFloat(tambahanSaldo);
    if (isNaN(tambahanSaldo) || tambahanSaldo <= 0) {
        showAlert("Jumlah yang dimasukkan tidak valid");
        return;
    }
    saldo += tambahanSaldo;
    console.log("Saldo terbaru Anda setelah ditambah adalah : Rp " + formatRupiah(saldo));

    updateSaldoDisplay();
    showAlert("Saldo terbaru Anda setelah ditambah adalah : Rp " + formatRupiah(saldo));
}

function kurangiSaldo(){
    let kuranganSaldo = window.prompt("Jumlah saldo yang dikurangi:");
    if (kuranganSaldo === null) return;
    kuranganSaldo = parseFloat(kuranganSaldo);
    if (isNaN(kuranganSaldo) || kuranganSaldo <= 0) {
        showAlert("Jumlah yang dimasukkan tidak valid");
        return;
    }
    if (kuranganSaldo > saldo) {
        showAlert("Saldo tidak cukup");
        return;
    }
    saldo -= kuranganSaldo;
    console.log("Saldo terbaru Anda setelah dikurangi adalah : Rp " + formatRupiah(saldo));
    
    showAlert("Saldo terbaru Anda setelah dikurangi adalah : Rp " + formatRupiah(saldo));
    updateSaldoDisplay();
}

function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID').format(amount);
}

function updateSaldoDisplay() {
    document.getElementById('saldo').innerText = 'Rp ' + formatRupiah(saldo);
}

function showAlert(message) {
    Swal.fire({
        text: message,
        position: 'top',
        timer: 5000, 
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        customClass: {
            popup: 'large-toast'
        }
    });
}

updateSaldoDisplay();
