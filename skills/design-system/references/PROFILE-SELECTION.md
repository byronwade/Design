# Profile selection

Select the narrowest profile that describes the shipped experience, not the technology stack alone.

| Product | Profile |
| --- | --- |
| SwiftUI or UIKit iPhone app | `ios-native` |
| SwiftUI or UIKit iPad app with resizable/multi-column behavior | `ipados-native` |
| Jetpack Compose or Android Views app | `android-native` |
| AppKit or SwiftUI macOS app | `macos-native` |
| WinUI/WPF/Windows App SDK app | `windows-native` |
| GTK/libadwaita app | `linux-gnome` |
| Qt/Kirigami Plasma app | `linux-kde` |
| Browser-based operational product | `web-app` |
| Browser-based acquisition, content, documentation, or editorial site | `web-marketing` |
| Electron/Tauri/webview UI in a native window | matching `electron-*` profile |

A responsive web app viewed on iPhone or iPad remains `web-app`; it does not inherit native Apple profiles. A Catalyst or native iPad app running on macOS remains governed by its actual shipped interaction model, with an explicit project override if macOS window/command behavior materially applies.

For a monorepo, configure multiple targets with distinct IDs and roots in `.design/project.json`. Name the target in every design task; otherwise use the single default target or the target whose root contains the changed product.
