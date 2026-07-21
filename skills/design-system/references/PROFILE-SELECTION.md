# Profile selection

Select the narrowest profile that describes the shipped experience, not the technology stack alone.

| Product | Profile |
| --- | --- |
| SwiftUI or UIKit iPhone app | `ios-native` |
| iPadOS product with resizable and multi-column behavior | `ipados-native` |
| Jetpack Compose or Android Views app | `android-native` |
| AppKit or SwiftUI macOS app | `macos-native` |
| WinUI, WPF, or Windows App SDK app | `windows-native` |
| GTK/libadwaita app | `linux-gnome` |
| Qt/Kirigami Plasma app | `linux-kde` |
| Browser-based operational product | `web-app` |
| Browser-based acquisition or content site | `web-marketing` |
| Electron, Tauri, or desktop webview | matching `electron-*` profile |

A responsive web app viewed on a phone remains `web-app`; it does not inherit native mobile behavior. Configure multiple targets in `.design/config.json`, give each a stable ID and product root, and name the target explicitly in design tasks.
