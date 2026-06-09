import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import Adw from 'gi://Adw';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';


export default class BottomDashPanelPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();

        const page = new Adw.PreferencesPage({
            title: 'Bottom Dash Panel',
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const group = new Adw.PreferencesGroup();
        page.add(group);

        // Show the panel on every monitor.
        const multiMonitor = new Adw.SwitchRow({
            title: 'Bottom panel on all monitors',
        });
        group.add(multiMonitor);
        window._settings.bind('multi-monitor', multiMonitor, 'active', Gio.SettingsBindFlags.DEFAULT);

        // Panel background color (supports transparency via the alpha slider).
        const bgColorRow = new Adw.ActionRow({
            title: 'Panel color',
        });
        group.add(bgColorRow);

        const colorButton = new Gtk.ColorButton({
            valign: Gtk.Align.CENTER,
            use_alpha: true,
        });

        const rgba = new Gdk.RGBA();
        rgba.parse(window._settings.get_string('background-color'));
        colorButton.set_rgba(rgba);

        colorButton.connect('color-set', () => {
            const c = colorButton.get_rgba();
            const colorString = `rgba(${Math.round(c.red * 255)},${Math.round(c.green * 255)},${Math.round(c.blue * 255)},${c.alpha})`;
            window._settings.set_string('background-color', colorString);
        });

        bgColorRow.add_suffix(colorButton);
        bgColorRow.activatable_widget = colorButton;
    }
}
