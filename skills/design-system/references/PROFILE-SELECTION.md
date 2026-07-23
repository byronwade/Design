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

## App type is a second choice

`profile` selects platform behavior. `appType` selects the product recipe layered on top of that platform. The recipe is defined in `design/COMPOSITION.json` and names the approved shell, layout, block families, component intent IDs, optional component source, and visual-reference policy. shadcn/ui may be one optional reference adapter, but it is not required for app-type composition.

Examples:

| App type | Profile | Composition emphasis |
| --- | --- | --- |
| `saas-workbench` | `web-app` | persistent context, commands, tables, detail panels |
| `admin-console` | `web-app` | permissions, filters, bulk actions, confirmation |
| `content-studio` | `web-app` | editor, assets, activity, draft recovery |
| `marketing-site` | `web-marketing` | explanation, trust, proof, one dominant conversion |

Do not use an app type to smuggle platform behavior into a target. The compiler rejects a recipe whose declared target profile does not match the selected profile.
