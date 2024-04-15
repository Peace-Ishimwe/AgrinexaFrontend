import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { authorizedAPI } from '../../utils/api';

export default function DiseaseDetect() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            // Convert image to binary data
            const response = await fetch(result.uri);
            const blob = await response.blob();
            // Post the binary data to the backend
            postImageToBackend(blob);
        }
    };

    const postImageToBackend = async (imageBlob) => {
        try {
            // Create FormData object to send binary data
            let formData = new FormData();
            formData.append('image', imageBlob);

            // Post FormData to backend using Axios
            const response = await axios.post(authorizedAPI.post("/pests/detect"), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleUpload = async () => {
        if (image) {
            try {
                const response = await fetch(image);
                const blob = await response.blob();
                postImageToBackend(blob);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            console.error('Please select an image.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agriculture Image Upload</Text>
            <Button title="Select Image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title="Upload Image" onPress={handleUpload} disabled={!image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
});
