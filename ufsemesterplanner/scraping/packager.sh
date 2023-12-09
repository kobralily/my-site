rm ./flaskapp.zip && zip -r flaskapp.zip . -x "*node_modules*" "*semester-page*" "static/assets/*" "env/*" "__pycache__/*" && unzip -l flaskapp.zip

# to run: ./pachager.sh