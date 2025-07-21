#!/usr/bin/env python3
"""
Script to fix corrupted Jupyter notebooks with JSON syntax errors.
"""

import json
import sys
import os
from pathlib import Path

def fix_notebook_json(notebook_path):
    """
    Attempt to fix common JSON syntax errors in Jupyter notebooks.
    """
    print(f"Fixing notebook: {notebook_path}")
    
    try:
        with open(notebook_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Try to parse as-is first
        try:
            json.loads(content)
            print(f"  ✓ Already valid JSON")
            return True
        except json.JSONDecodeError as e:
            print(f"  ✗ JSON Error: {e}")
            
        # Common fixes for notebook JSON issues
        fixed_content = content
        
        # Fix 1: Add missing closing brackets and commas for incomplete cells
        # This is a common issue where cell content is not properly closed
        
        # Fix 2: Remove trailing commas before closing brackets
        import re
        
        # Fix trailing commas in arrays and objects
        fixed_content = re.sub(r',(\s*[}\]])', r'\1', fixed_content)
        
        # Fix 3: Ensure proper cell structure
        # Look for incomplete cell endings and fix them
        
        # Try to parse the fixed content
        try:
            parsed = json.loads(fixed_content)
            
            # Validate notebook structure
            if not isinstance(parsed, dict):
                raise ValueError("Notebook must be a JSON object")
            
            if 'cells' not in parsed:
                raise ValueError("Notebook must have 'cells' field")
            
            if not isinstance(parsed['cells'], list):
                raise ValueError("'cells' must be an array")
            
            # Write the fixed content back
            with open(notebook_path, 'w', encoding='utf-8') as f:
                json.dump(parsed, f, indent=1, ensure_ascii=False)
            
            print(f"  ✓ Fixed and validated")
            return True
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"  ✗ Could not fix automatically: {e}")
            return False
            
    except Exception as e:
        print(f"  ✗ Error reading file: {e}")
        return False

def main():
    """Main function to fix all corrupted notebooks."""
    
    corrupted_notebooks = [
        '_projects/10_customer-segmentation-financial-services.ipynb',
        '_projects/6_predicting-apartment-prices-buenos-aires.ipynb',
        '_projects/8_predicting-earthquake-damage-case-study-nepal.ipynb',
        '_projects/12_volatility-forecasting-in-india/end-to-end-stock-volatility-forecasting-api-deployment.ipynb',
        '_projects/9_bankruptcy-in-poland/predicting-corporate-bankruptcy-poland.ipynb'
    ]
    
    print("Starting notebook repair process...")
    print(f"Found {len(corrupted_notebooks)} corrupted notebooks to fix\n")
    
    fixed_count = 0
    failed_count = 0
    
    for notebook in corrupted_notebooks:
        if os.path.exists(notebook):
            if fix_notebook_json(notebook):
                fixed_count += 1
            else:
                failed_count += 1
        else:
            print(f"  ✗ File not found: {notebook}")
            failed_count += 1
        print()
    
    print(f"Repair Summary:")
    print(f"  Fixed: {fixed_count}")
    print(f"  Failed: {failed_count}")
    print(f"  Total: {len(corrupted_notebooks)}")
    
    return failed_count == 0

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)