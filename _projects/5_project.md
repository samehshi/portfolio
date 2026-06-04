---
layout: page
title: Real Estate Market Analysis Uncovering Price Drivers in Mexico and Brazil
description: An analysis of the real estate markets in Mexico and Brazil to identify the key factors that influence property prices.
img: assets/img/Placeholders/Capture-2025-07-21-201233.png
importance: 5
category: Data Science Projects
---

This project analyzes an e-commerce dataset to understand and predict product prices in the real estate markets of Mexico and Brazil. The process involves several key stages:

1.  **Data Loading & Cleaning:** The dataset is loaded, and missing values in critical fields like `category_name` and `brand_name` are handled. The `category_name` is broken down into three sub-categories for a more granular analysis.

2.  **Exploratory Data Analysis (EDA):** The analysis reveals that the `price` variable is highly skewed. To normalize it, a log transformation (`log(price+1)`) is applied. The notebook then examines the distributions of various features, including item condition, shipping status, top brands, and categories.

3.  **Feature Engineering:** To prepare the data for modeling, categorical and text-based features are converted into a numerical format:
    *   **Text:** `CountVectorizer` is used for the item `name`, and `TfidfVectorizer` is used for the `item_description`.
    *   **Categorical:** `LabelBinarizer` (similar to one-hot encoding) is applied to the `brand_name` and the newly created sub-categories.

4.  **Modeling:** All engineered features are combined into a single sparse matrix. A `Ridge` linear regression model is trained on this data to predict the log-transformed price.

5.  **Evaluation:** The model's performance is measured using the Root Mean Squared Logarithmic Error (RMSLE), a standard metric for this type of regression problem.

In summary, this notebook demonstrates how to build a machine learning model to predict product prices based on features like their name, description, brand, and category.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <iframe src="https://www.kaggle.com/embed/samehshehata/uncovering-price-drivers-in-mexico-and-brazil" height="800" width="100%" frameborder="0" scrolling="auto" title="Uncovering Price Drivers in Mexico and Brazil"></iframe>
    </div>
</div>