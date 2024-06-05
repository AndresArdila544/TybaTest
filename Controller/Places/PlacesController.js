const express = require('express');
const axios = require('axios');
const { createTransactionLog } = require("../Transactions/TransactionController");
const {apikey} = require("../../config");

async function getCoordinates(cityName) {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: cityName,
        key: apikey, // Replace with your actual API key
      }
    });
    console.log('Google Places API Response:', response.data);
    const location = response.data.results[0].geometry.location;
    
    return `${location.lat},${location.lng}`;
  }


async function getRestaurants(req, res) {
  try {
    let { location } = req.query; // Location can be either a city name or coordinates (latitude,longitude)
    await createTransactionLog("PLACES",  "ALL_USERS",location);
    if (!/^-?\d+\.\d+,-?\d+\.\d+$/.test(location)) {
        // Convert city name to coordinates
        location = await getCoordinates(location);
    }
    // Make a request to the Google Places API Nearby Search endpoint
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: location,
        radius: 5000, // Radius in meters (adjust as needed)
        type: 'restaurant', // Type of place to search for
        key: apikey, // Replace with your actual API key
      }
    });

    console.log(location)

    // Extract relevant information from the API response
    const restaurants = response.data.results.map((result) => {
      return {
        name: result.name,
        vicinity: result.vicinity,
        location: result.geometry.location,
      };
    });
    console.log('Google Places API Response:', response.data);
    console.log(restaurants)
    // Return the list of restaurants
    return res.status(200).json({
      status: true,
      data: restaurants,
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return res.status(500).json({
      status: false,
      error: 'Internal server error',
    });
  }
};

module.exports = {
    getRestaurants,
  };
