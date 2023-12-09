import os

def list_files(startpath):
    # Common directories to skip
    skip_directories = ['__pycache__', 'env', 'node_modules', '.git', '.idea', '.vscode', 'build', 'dist', 'venv', '.DS_Store']

    for root, dirs, files in os.walk(startpath, topdown=True):
        # Filter out the directories to skip
        dirs[:] = [d for d in dirs if d not in skip_directories]

        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print(f"{indent}{os.path.basename(root)}/")
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            print(f"{subindent}{f}")

# Replace '/your/root/directory' with the path to your root directory
list_files('/Users/olivia/Documents/coding_mac/my-site/ufsemesterplanner/scraping')
