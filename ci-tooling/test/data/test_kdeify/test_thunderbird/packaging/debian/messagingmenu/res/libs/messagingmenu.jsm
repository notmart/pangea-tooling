/* -*- Mode: javascript; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* ***** BEGIN LICENSE BLOCK *****
 *	 Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is messagingmenu-extension
 *
 * The Initial Developer of the Original Code is
 * Mozilla Messaging, Ltd.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *    Lars Uebernickel < lars.uebernickel@canonical.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * 
 * ***** END LICENSE BLOCK ***** */

const { utils: Cu } = Components;

var EXPORTED_SYMBOLS = [ "messagingmenu" ];

Cu.import("resource://gre/modules/ctypes.jsm");
Cu.import("resource://messagingmenu/modules/utils.jsm");
Cu.import("resource://messagingmenu/libs/glib.jsm");
Cu.import("resource://messagingmenu/libs/gobject.jsm");

const MESSAGING_MENU_LIBNAME = "messaging-menu";
const MESSAGING_MENU_ABIS    = [ 0 ];

function messaging_menu_defines(lib) {
  CTypesUtils.defineSimple(this, "MessagingMenuApp",
                           ctypes.StructType("MessagingMenuApp"));

  lib.lazy_bind("messaging_menu_app_new", this.MessagingMenuApp.ptr,
                [glib.gchar.ptr]);
  lib.lazy_bind("messaging_menu_app_register", ctypes.void_t,
                [this.MessagingMenuApp.ptr]);
  lib.lazy_bind("messaging_menu_app_unregister", ctypes.void_t,
                [this.MessagingMenuApp.ptr]);

  lib.lazy_bind("messaging_menu_app_append_source", ctypes.void_t,
                [this.MessagingMenuApp.ptr, glib.gchar.ptr, glib.gpointer,
                 glib.gchar.ptr]);
  lib.lazy_bind("messaging_menu_app_append_source_with_count", ctypes.void_t,
                [this.MessagingMenuApp.ptr, glib.gchar.ptr, glib.gpointer,
                 glib.gchar.ptr, glib.guint]);

  lib.lazy_bind("messaging_menu_app_remove_source", ctypes.void_t,
                [this.MessagingMenuApp.ptr, glib.gchar.ptr]);
  lib.lazy_bind("messaging_menu_app_has_source", glib.gboolean,
                [this.MessagingMenuApp.ptr, glib.gchar.ptr]);
  lib.lazy_bind("messaging_menu_app_set_source_count", ctypes.void_t,
                [this.MessagingMenuApp.ptr, glib.gchar.ptr, glib.guint]);
  lib.lazy_bind("messaging_menu_app_draw_attention", ctypes.void_t,
                [this.MessagingMenuApp.ptr, glib.gchar.ptr]);
  lib.lazy_bind("messaging_menu_app_remove_attention", ctypes.void_t,
                [this.MessagingMenuApp.ptr, glib.gchar.ptr]);

  gobject.createSignal(this.MessagingMenuApp, "activate-source", ctypes.void_t,
                       [this.MessagingMenuApp.ptr, glib.gchar.ptr,
                        glib.gpointer]);
}

var messagingmenu = CTypesUtils.newLibrary(MESSAGING_MENU_LIBNAME, MESSAGING_MENU_ABIS, messaging_menu_defines);
