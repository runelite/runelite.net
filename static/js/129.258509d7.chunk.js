(this["webpackJsonprunelite.net"]=this["webpackJsonprunelite.net"]||[]).push([[129],{719:function(e,n){e.exports={title:"1.6.21 Release",description:"Pyramid Plunder plugin, Ground Items text outlines, NPC Indicator highlight style toggles",author:"Jordan",body:'<p>We\'ve added a <a href="https://github.com/runelite/runelite/wiki/Pyramid-Plunder" native="" rel="nofollow">Pyramid Plunder plugin</a>\nwhich can hide the vanilla timer display and substitute it with an accurate timer infobox.\nAdditionally, it can highlight the spear traps, unopened doors, unopened urns, chests, and\nsarcophagi. Thanks to <a href="https://github.com/Mitchell-Kovacs" native="" rel="nofollow">@Mitchell-Kovacs</a> for this addition!</p>\n<p><img src="/img/blog/1.6.21-Release/pyramid-plunder-plugin.png" alt="Pyramid Plunder plugin"></p>\n<p>The <a href="https://github.com/runelite/runelite/wiki/Ground-Items" native="" rel="nofollow">Ground Items plugin</a> plugin can now\ndraw an outline around ground item text instead of a simple shadow.</p>\n<p><img src="/img/blog/1.6.21-Release/ground-items-text-outline.png" alt="Ground Items overlay with outlined text"></p>\n<p>You can now toggle multiple overlay styles for the <a href="https://github.com/runelite/runelite/wiki/NPC-Indicators" native="" rel="nofollow">NPC Indicators\nplugin</a> to show any combination of NPC\nlocation, southwest tile, and hull. Thanks to <a href="https://github.com/haakonrp" native="" rel="nofollow">@haakonrp</a> for this\nfeature.</p>\n<p><img src="/img/blog/1.6.21-Release/npc-indicators-overlay-toggles.png" alt="NPC Indicator overlay toggles"></p>\n<p>With <a href="https://secure.runescape.com/m=news/death-changes?oldschool=1" native="" rel="nofollow">the update to the game\'s death\nmechanics</a>, the Items Kept on Death\nand Death Indicator plugins are no longer needed and have been removed from the client.</p>\n<p>There are also several smaller improvements and bug fixes, including:</p>\n<ul>\n<li>The <a href="https://github.com/runelite/runelite/wiki/XP-Tracker" native="" rel="nofollow">XP Tracker plugin</a> has an option to\nmove skills with most recent XP gains to the top of the list</li>\n<li>The client now remembers when your sidebar is hidden across client restarts</li>\n<li>Your selected <a href="https://github.com/runelite/runelite/wiki/Bank-Tags" native="" rel="nofollow">bank tag tab</a> is now saved and\nremembered when opening the bank equipment interface</li>\n<li>The <a href="https://github.com/runelite/runelite/wiki/Anti-Drag" native="" rel="nofollow">Anti Drag plugin</a> now prevents dragging\nin your inventory when the bank interface is open</li>\n<li>The <a href="https://github.com/runelite/runelite/wiki/Friends-Chat" native="" rel="nofollow">Friends Chat</a> plugin has an option to\nconfigure the duration that join and leave messages remain in chat</li>\n<li>A Tan-all swap has been added to the <a href="https://github.com/runelite/runelite/wiki/Menu-Entry-Swapper" native="" rel="nofollow">Menu Entry Swapper\nplugin</a></li>\n<li>Drakan\'s medallion teleport locations have been added to the <a href="https://github.com/runelite/runelite/wiki/World-Map" native="" rel="nofollow">World Map\nplugin</a></li>\n<li>The <a href="https://github.com/runelite/runelite/wiki/Discord" native="" rel="nofollow">Discord plugin</a> now shows when you are\nin the Hallowed Sepulchre</li>\n<li>A toggle to hide tooltips in the spellbook has been added to the <a href="https://github.com/runelite/runelite/wiki/Mouse-Tooltips" native="" rel="nofollow">Mouse Tooltips\nplugin</a></li>\n<li>You can toggle the Daeyalt essence experience bonus in the runecrafting <a href="https://github.com/runelite/runelite/wiki/Skill-Calculator" native="" rel="nofollow">Skill\nCalculator</a></li>\n<li>Timers have been added to the <a href="https://github.com/runelite/runelite/wiki/Mining" native="" rel="nofollow">Mining plugin</a>\nfor Daeyalt essence rocks</li>\n<li>The <a href="https://github.com/runelite/runelite/wiki/Chat-Commands" native="" rel="nofollow">Chat Commands plugin</a> can now track\npersonal best times for Chambers of Xeric teams of 24+ players and updates its values for personal\nbest times from previous PB times</li>\n</ul>\n<p>Enjoy!</p>\n<p>- Jordan</p>\n<h3>New commits</h3>\n<p>We had 18 contributors this release!</p>\n<pre><code>Adam (10):\n      client: correct spelling of taverley\n      client: fetch jav_config over https\n      screenmarkers: cleanup widget marker overlay bounds logic\n      textcomponent: add option to outline text\n      grounditems: add option to outline text\n      menu swapper: clean up swap logic\n      menu swapper: add tan all swap\n      client: remove itemskeptondeath plugin\n      chat commands: name pb matcher groups\n      client: remove death indicator plugin\n\nBroooklyn (2):\n      FriendsChatConfig: Fix config grammar\n      agility: Fix config order\n\nHydrox6 (1):\n      clues: add mention that nechryael has to be in the slayer tower\n\nH\xe5kon Paulsen (1):\n      npc indicators: allow combination of higlight styles\n\nJacob Scanlon (1):\n      friends chat plugin: add configuration for join/leave timeout\n\nJordan Atwood (5):\n      worldmap: Add Drakan\'s medallion teleport locations\n      worldmap: Add Daeyalt essence mine tooltip\n      SkillChallengeClue: Fix &quot;Mine a mithril ore&quot; step\n      discord: Add Darkmeyer and Hallowed Sepulchre minigame\n      menuentryswapper: Fix birdhouse swap\n\nJoseph Zeffiro (1):\n      mousehighlight: Add toggle to hide spellbook tooltips (#11924)\n\nMMagicala (3):\n      antidrag: add antidrag to inventory when bank interface is open\n      xp tracker: add option to sort skills by most recently gained xp\n      item charges: Fix Amulet of Chemistry charges for low-dose potions (#11825)\n\nMax Weber (1):\n      chatcommands: don\'t throw every tick if the player has opened a scroll\n\nMitchell Kovacs (1):\n      Add Pyramid Plunder plugin\n\nOliver Payne (1):\n      CoordinateClue: Improve Ice Mountain clue location description (#11907)\n\nTheStonedTurtle (1):\n      skillcalc: Add Daeyalt essence bonus (#11839)\n\nTim Hinz (1):\n      mining: Add Daeyalt essence timers\n\nTrevor (1):\n      cache: add healthbar dumper\n\nXortrox (1):\n      clientui: remember sidebar state across restarts\n\njohannfrias (1):\n      banktags: Save last opened tab when opening worn items (#11660)\n\nleejt (1):\n      loottracker: add standard Casket\n\nmelkypie (2):\n      chatcommands: fix cox pb tracking for 24+ players team size\n      chatcommands: allow cox pb to look at previous pb times from jagex\n</code></pre>\n',image:"/img/blog/1.6.21-Release/pyramid-plunder-plugin.png"}}}]);
//# sourceMappingURL=129.258509d7.chunk.js.map