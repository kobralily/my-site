# Define the common base directory
BASE_DIR="/Users/olivia/Documents/coding_mac/my-site/ufsemesterplanner/scraping"

# Set the paths accordingly
REACT_APP_DIR="$(BASE_DIR)/semester-page"
FLASK_STATIC_DIR="$(BASE_DIR)/static"
FLASK_TEMPLATES_DIR="$(BASE_DIR)/templates"

# Default target
all: build_react move_files update_template

# Step 1: Build the React app
build_react:
	@echo "Building React app..."
	@cd $(REACT_APP_DIR) && npm install && npm run build

# Step 2: Move the built files to Flask's static directory
move_files:
	@echo "Moving built files to Flask static directory..."
	@rm -rf $(FLASK_STATIC_DIR)/assets/*
	@mv $(REACT_APP_DIR)/dist/assets/* $(FLASK_STATIC_DIR)/assets/

# Step 3: Update Flask template with new hashed filenames
update_template:
	@echo "Updating Flask template..."
	@$(eval CSS_FILE=$(shell ls $(FLASK_STATIC_DIR)/assets | grep .css))
	@$(eval JS_FILE=$(shell ls $(FLASK_STATIC_DIR)/assets | grep .js))
	@sed -i '' 's/assets\/index-[a-z0-9]*.css/assets\/$(CSS_FILE)/g' $(FLASK_TEMPLATES_DIR)/modelsemester.html
	@sed -i '' 's/assets\/index-[a-z0-9]*.js/assets\/$(JS_FILE)/g' $(FLASK_TEMPLATES_DIR)/modelsemester.html

.PHONY: all build_react move_files update_template
