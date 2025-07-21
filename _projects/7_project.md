---
layout: page
title: Predictive Modeling of Air Quality in Nairobi, Kenya
description: A machine learning project to predict air quality in Nairobi, Kenya.
img: assets/img/Placeholders/Capture-2025-07-21-201458.png
importance: 7
category: Data Science Projects
---

This project focuses on building a machine learning model to predict air quality, specifically the concentration of PM2.5, in Nairobi. The primary goal is to create a reliable model for forecasting PM2.5 levels, which is a critical air pollutant with significant health implications.

The process involves several key stages:

1.  **Data Exploration and Cleaning:** The dataset is sourced from AirQo and contains air quality and meteorological data from sensors across Nairobi. The primary features include concentrations of pollutants like PM1, PM2.5, and PM10, as well as weather data such as temperature and humidity. The raw data is cleaned by handling missing values.

2.  **Feature Engineering and Preparation:** The timestamp is processed to extract useful time-based features like the hour of the day, day of the week, and month. Rolling averages are created to capture time-series trends.

3.  **Modeling and Evaluation:** Several regression models are trained and compared, including Linear Regression, Random Forest Regressor, Gradient Boosting Regressor, and XGBoost Regressor. The models are evaluated using standard regression metrics: Mean Absolute Error (MAE), Mean Squared Error (MSE), and R-squared (R²).

4.  **Results and Conclusion:** The results are compared to identify the best-performing model. Typically, ensemble models like Random Forest and XGBoost outperform simpler models like Linear Regression in such tasks. The final model can be used to forecast air quality, providing valuable information for public health and environmental management.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <iframe src="https://www.kaggle.com/embed/samehshehata/predictive-modeling-of-air-quality-in-nairobi" height="800" width="100%" frameborder="0" scrolling="auto" title="Predictive Modeling of Air Quality in Nairobi, Kenya"></iframe>
    </div>
</div>