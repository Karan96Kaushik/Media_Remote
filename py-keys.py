import pyautogui

print('click')

screenWidth, screenHeight = pyautogui.size()
currentMouseX, currentMouseY = pyautogui.position()
while 1:
    key = input('-->')
    print('======' + key + '==========')
    
    if key == 'key':
        print('key')
    elif key == 'click':
        print('click')
    else:
        pyautogui.press(key) 
    pass