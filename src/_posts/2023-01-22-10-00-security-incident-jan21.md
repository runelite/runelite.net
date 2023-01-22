---
title: 'Security Incident Jan 21 2023'
description: 'Security Incident Jan 21 2023'
author: Adam
---

On Janurary 10 a plugin named `ChatClip` was erroneously published to the plugin hub which, under non-default configuration, would permit an attacker to remotely execute code on a victims computer by sending an in-game message.

This was caused by human error on our part, where we approved the plugin despite the code being exploitable.

To be affected by this issue, you would have had to 1) installed the chat clip plugin, and 2) enabled the `Add to history` option within the plugin.

Over the 11 day period the plugin was active on the plugin hub, the plugin was installed 118 times by 78 unique IPs. We have no way to determine how many of those users enabled the `Add to history` option allowing the exploitable behavior.

We raised the issue to Jagex, and provided to them the IPs of the players who we think could be affected. A staff member briefly took a look at the possibly affected accounts on Saturday, did not find anything requiring immediate attention, and has promised to look into it this week. I hope that they will be able to take corrective action if any compromised accounts are found.

We have also checked all existing plugin hub plugins and found no other plugins with similarly exploitable code.

To prevent this from happening again in the future, we will be automatically flagging plugins which use potentially dangerous APIs that can allow command injection, to require them to be more closely scrutinized.

\- Adam
