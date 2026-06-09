# Simple Bottom Panel

A clean, solid bottom panel for GNOME Shell.

Turns the GNOME dash into an always-on, full-width bottom panel. It reserves its
space (windows don't overlap it), and clicking an app icon shows or minimizes it.

Fork of [Bottom Dash Panel](https://github.com/fthx/bottom-dash-panel) by @fthx.

## Behaviour

- Full-width, always-visible bottom panel
- Click an app icon to raise it; click again to minimize it (minimizes toward the icon)
- Show-apps button on the left
- Subtle hover highlight
- Configurable panel color
- Optional: show on all monitors

## Install

    git clone https://github.com/neonn0d/simple-bottom-panel.git \
      ~/.local/share/gnome-shell/extensions/simple-bottom-panel@neonn0d
    glib-compile-schemas \
      ~/.local/share/gnome-shell/extensions/simple-bottom-panel@neonn0d/schemas/

Log out and back in (required on Wayland), then:

    gnome-extensions enable simple-bottom-panel@neonn0d

## Requirements

GNOME Shell 46–50.

## License

GPL-3.0-or-later. Based on Bottom Dash Panel by @fthx.
