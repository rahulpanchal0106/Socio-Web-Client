const generate_UID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@!#$%^&*()';
    let uid = '';
    for (let i = 0; i < 11; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        uid += chars[randomIndex];
    }
    return uid;
};

export default generate_UID;