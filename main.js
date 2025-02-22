// Подключаем необходимые модули Electron, включая Menu для создания меню
const { app, BrowserWindow, Menu } = require('electron');

/**
 * Функция createWindow создает окно приложения и устанавливает меню.
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Загружаем главную страницу приложения
  win.loadFile('index.html');

  // Открываем DevTools для отладки
  win.webContents.openDevTools();

  // Определяем шаблон меню приложения
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }  // Добавляет стандартный пункт "Выход"
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },   // Отмена
        { role: 'redo' },   // Повтор действия
        { type: 'separator' },
        { role: 'cut' },    // Вырезать
        { role: 'copy' },   // Копировать
        { role: 'paste' }   // Вставить
      ]
    }
  ];

  // Строим меню из шаблона и устанавливаем его для приложения
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
