const sendPost = async (route, formData) => {
    // const url = "http://localhost:8080";
    const url = "";
    try {
        const response = await fetch(url + `/api/${route}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.error('Response error', response);
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw new Error(error.message);
    }
};

export default sendPost;
