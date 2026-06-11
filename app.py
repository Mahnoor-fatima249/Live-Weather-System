import streamlit as st
import requests

# Page Configuration
st.set_page_config(page_title="AI Weather Dashboard", page_icon="🌤️", layout="centered")

st.title("🌤️ Real-Time AI Weather Insights")
st.write("Enter a city name to get live weather data powered by Python backend layer.")

# User Input
city = st.text_input("Enter City Name:", placeholder="e.g., Lahore, London, New York")

if city:
    # OpenWeatherMap API Implementation (Free API Call)
    API_KEY = "b713ec71c6dd4c4a8a5b2857a2cbb5bb" # Sample Demo Key
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(url).json()
        
        if response.get("cod") == 200:
            # Data Extraction
            temp = response["main"]["temp"]
            humidity = response["main"]["humidity"]
            desc = response["weather"][0]["description"].title()
            
            # Display Metrics in Beautiful Layout
            col1, col2 = st.columns(2)
            with col1:
                st.metric(label="Temperature", value=f"{temp} °C")
            with col2:
                st.metric(label="Humidity", value=f"{humidity} %")
                
            st.info(f"**Current Condition:** {desc}")
            
            # AI Logic Simulation
            if temp > 30:
                st.warning("🤖 **AI Assistant Suggestion:** It's quite hot outside. Stay hydrated and optimize backend system cooling!")
            elif temp < 15:
                st.snowflake()
                st.info("🤖 **AI Assistant Suggestion:** Cold weather detected. Perfect time for coding backend agentic workflows with hot coffee!")
            else:
                st.success("🤖 **AI Assistant Suggestion:** Weather is pleasant. Optimal conditions for deploying servers.")
        else:
            st.error("City not found. Please check the spelling.")
            
    except Exception as e:
        st.error(f"Backend Connection Error: {str(e)}")
