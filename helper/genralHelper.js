const getImageNameFromURL = (imageURL) => {
    const url = new URL(imageURL);
    const pathSegments = url.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
};



const generateRandomPassword = (length = 12) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

module.exports = { getImageNameFromURL, generateRandomPassword };