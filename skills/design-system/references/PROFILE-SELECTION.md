# Profile selection

Select the narrowest profile that describes the shipped experience, not the technology stack alone.

| Product | Profile |
| --- | --- |
| SwiftUI or UIKit iPhone/iPad app | `ios-native` |
| Jetpack Compose or Android Views app | `android-native` |
| AppKit or SwiftUI macOS app | `macos-native` |
| WinUI/WPF/Windows App SDK app | `windows-native` |
| GTK/libadwaita app | `linux-gnome` |
| Qt/Kirigami Plasma app | `linux-kde` |
| Browser-based operational product | `web-app` |
| Browser-based acquisition/content site | `web-marketing` |
| Electron/Tauri web UI in a native window | matching `electron-*` profile |

A responsive web app viewed on iPhone remains `web-app`; it does not inherit `ios-native`. Native interaction conventions may be used only when the browser can implement them without impersonating system UI or breaking web expectations.

For a monorepo, configure multiple targets in `.design/project.json` and name the target explicitly in every design task.
