---
layout: page
title: Predicting Apartment Prices in Buenos Aires
description: A machine learning project to predict apartment prices in Buenos Aires based on property listings.
img: assets/img/Placeholders/Capture-2025-07-21-201334.png
importance: 6
category: Data Science Projects
---

This project focuses on predicting apartment prices in Buenos Aires using a dataset of property listings. The primary goal is to build a machine learning model that can accurately predict the price of apartments in U.S. dollars.

The process involves several key stages:

1.  **Data Exploration and Cleaning:** The author begins by loading and examining the dataset, which includes features like property type, location (neighborhood, latitude, longitude), surface area (total and covered), number of rooms, and price. A significant amount of data cleaning is performed, which includes dropping columns with too many missing values, removing outliers, and imputing missing values for important features.

2.  **Feature Engineering and Preparation:** Categorical features like `property_type` and `place_name` (neighborhood) are converted into a numerical format using one-hot encoding. The data is then split into training and testing sets.

3.  **Modeling and Evaluation:** Several regression models are trained and compared, including Linear Regression, Ridge, Lasso, Random Forest, Gradient Boosting, and XGBoost. The models are evaluated based on Mean Absolute Error (MAE) and the R-squared (R²) score.

4.  **Results and Conclusion:** The **XGBoost Regressor** performed the best, achieving the lowest MAE and the highest R-squared score. An analysis of feature importance from the best model revealed that the most influential factors in determining an apartment's price are its total surface area, covered surface area, and location.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <iframe src="https://www.kaggle.com/embed/samehshehata/predicting-apartment-prices-in-buenos-aires" height="800" width="100%" frameborder="0" scrolling="auto" title="Predicting Apartment Prices in Buenos Aires"></iframe>
    </div>
</div>