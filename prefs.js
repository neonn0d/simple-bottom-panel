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

        // --- Monitor selection ---------------------------------------------
        // Options: 0 = All monitors, 1 = Primary (automatic), 2.. = each screen.
        const model = new Gtk.StringList();
        model.append('All monitors');
        model.append('Primary (automatic)');

        const gdkMonitors = Gdk.Display.get_default().get_monitors();
        const monitorCount = gdkMonitors.get_n_items();
        for (let i = 0; i < monitorCount; i++) {
            const m = gdkMonitors.get_item(i);
            const connector = m.get_connector() || `Monitor ${i + 1}`;
            const geo = m.get_geometry();
            model.append(`${connector}  (${geo.width}×${geo.height})`);
        }

        const monitorRow = new Adw.ComboRow({
            title: 'Monitor',
            subtitle: 'Which screen the panel appears on.',
            model: model,
        });
        group.add(monitorRow);

        // Initialise selection from current settings.
        if (window._settings.get_boolean('multi-monitor')) {
            monitorRow.selected = 0;
        } else {
            const idx = window._settings.get_int('monitor-index');
            monitorRow.selected = (idx >= 0 && idx < monitorCount) ? idx + 2 : 1;
        }

        monitorRow.connect('notify::selected', () => {
            const sel = monitorRow.selected;
            if (sel === 0) {
                window._settings.set_boolean('multi-monitor', true);
            } else if (sel === 1) {
                window._settings.set_boolean('multi-monitor', false);
                window._settings.set_int('monitor-index', -1);
            } else {
                window._settings.set_boolean('multi-monitor', false);
                window._settings.set_int('monitor-index', sel - 2);
            }
        });

        // --- Panel color ----------------------------------------------------
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
