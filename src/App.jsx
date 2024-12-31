// ShoeStore.jsx
import React, { useState } from 'react';
import './ShoeStore.css';

const ShoeStore = () => {
    const [sepatu, setSepatu] = useState([]);
    const [cari, setCari] = useState('');
    const [form, setForm] = useState({ id: '', nama: '', merek: '', harga: '' });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleTambahSepatu = () => {
        if (isEditing) {
            setSepatu(sepatu.map(item => item.id === form.id ? form : item));
            setIsEditing(false);
        } else {
            setSepatu([...sepatu, { ...form, id: Date.now().toString() }]);
        }
        setForm({ id: '', nama: '', merek: '', harga: '' });
    };

    const handleEditSepatu = (item) => {
        setForm(item);
        setIsEditing(true);
    };

    const handleHapusSepatu = (id) => {
        setSepatu(sepatu.filter(item => item.id !== id));
    };

    const sepatuTersaring = sepatu.filter(item =>
        item.nama.toLowerCase().includes(cari.toLowerCase()) ||
        item.merek.toLowerCase().includes(cari.toLowerCase())
    );

    return (
        <div className="shoe-store">
            <h1>Toko Sepatu</h1>
            <div className="form">
                <input
                    type="text"
                    name="nama"
                    placeholder="Nama Sepatu"
                    value={form.nama}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="merek"
                    placeholder="Merek"
                    value={form.merek}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="jumlah"
                    placeholder="jumlah"
                    value={form.jumlah}
                    onChange={handleInputChange}
                />
                <button onClick={handleTambahSepatu}>{isEditing ? 'Perbarui' : 'Tambah'}</button>
            </div>

            <div className="search">
                <input
                    type="text"
                    placeholder="Cari sepatu..."
                    value={cari}
                    onChange={(e) => setCari(e.target.value)}
                />
            </div>

            <div className="shoe-list">
                {sepatuTersaring.map(item => (
                    <div className="shoe-item" key={item.id}>
                        <h3>{item.nama}</h3>
                        <p>Merek: {item.merek}</p>
                        <p>Jumlah: {item.jumlah}</p>
                        <button onClick={() => handleEditSepatu(item)}>Edit</button>
                        <button onClick={() => handleHapusSepatu(item.id)}>Hapus</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoeStore;
