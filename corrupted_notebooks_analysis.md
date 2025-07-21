# Corrupted Jupyter Notebooks Analysis

## Identified Corrupted Notebooks

Based on JSON validation of all notebook files in the `_projects/` directory:

### Corrupted Notebooks (5 total):

1. **`_projects/10_customer-segmentation-financial-services.ipynb`**
   - **Error**: `Expecting value: line 2730 column 1 (char 358119)`
   - **Issue**: JSON structure is truncated or has missing content at end of file

2. **`_projects/6_predicting-apartment-prices-buenos-aires.ipynb`**
   - **Error**: `Expecting ',' delimiter: line 1801 column 812 (char 401461)`
   - **Issue**: Missing comma delimiter in JSON structure

3. **`_projects/8_predicting-earthquake-damage-case-study-nepal.ipynb`**
   - **Error**: `Expecting ',' delimiter: line 1535 column 805 (char 229640)`
   - **Issue**: Missing comma delimiter in JSON structure

4. **`_projects/12_volatility-forecasting-in-india/end-to-end-stock-volatility-forecasting-api-deployment.ipynb`**
   - **Error**: `Expecting ',' delimiter: line 105 column 76 (char 5567)`
   - **Issue**: Missing comma delimiter in JSON structure (early in file)

5. **`_projects/9_bankruptcy-in-poland/predicting-corporate-bankruptcy-poland.ipynb`**
   - **Error**: `Expecting ',' delimiter: line 1295 column 747 (char 169519)`
   - **Issue**: Missing comma delimiter in JSON structure

### Valid Notebooks (3 total):
- `_projects/5_Analyzing Real Estate Markets in Mexico & Brazil.ipynb` ✓
- `_projects/7_predictive-modeling-air-quality-nairobi-kenya.ipynb` ✓
- `_projects/11_ds-admissions-in-wqu/Improving Applicant Engagement through AB Testing.ipynb` ✓

## Error Patterns Observed:
- **Missing comma delimiters**: Most common issue (4 out of 5 notebooks)
- **Truncated JSON content**: 1 notebook has missing content at end of file
- **Location patterns**: Errors occur at various depths in the JSON structure

## Next Steps:
1. Fix JSON syntax errors in each corrupted notebook
2. Validate repairs by re-running JSON parsing
3. Test Jekyll build to ensure notebooks process correctly