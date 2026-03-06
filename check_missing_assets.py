
import os
import re

def check_images(directory):
    img_tag_pattern = re.compile(r'<img [^>]*src=["\']([^"\']+)["\']', re.IGNORECASE)
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.angular' in dirs:
            dirs.remove('.angular')
        if '.git' in dirs:
            dirs.remove('.git')
            
        for file in files:
            if file.endswith('.html') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    matches = img_tag_pattern.findall(content)
                    for src in matches:
                        if src.startswith('http'):
                            continue
                        # In Angular, src="assets/..." maps to public/assets/... if configured
                        # Or src="{{...}}" or [src]
                        if '{{' in src or '[' in src or src.startswith('data:'):
                            continue
                            
                        # Standardize path
                        clean_src = src.replace('/', os.sep)
                        if clean_src.startswith(os.sep):
                            clean_src = clean_src[1:]
                            
                        # Check possible locations
                        possible_paths = [
                            os.path.join(os.getcwd(), 'public', clean_src),
                            os.path.join(os.getcwd(), 'src', clean_src),
                        ]
                        
                        found = False
                        for p in possible_paths:
                            if os.path.exists(p):
                                found = True
                                break
                        
                        if not found:
                            print(f"MISSING: {src} in {filepath}")

if __name__ == "__main__":
    check_images(os.path.join(os.getcwd(), 'src'))
