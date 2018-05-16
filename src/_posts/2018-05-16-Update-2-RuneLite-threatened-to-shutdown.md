---
title: 'RuneLite threatened to shutdown - Update 2'
description: 'RuneLite threatened to shutdown - Update 2'
author: Adam
---

I have just finished speaking to MMK. I have agreed on a 1-2 day halt on
development pending further discussion, and I have closed sourced the
deobfuscator and the deobfuscated RuneScape client. RuneLite is allowed to
operate during this time.

The new OSBuddy API that has been announced is also a nice step forward. The two
clients become not too dissimilar at that point, both with a closed API
implementation.

What this means for developers is you must rely on our exposed API and are no
longer able to extend or modify it. This limits development some certainly but
it is what we must do.

The closed sourced components are both build-time and update-time tools, and are
not artifacts shipped to the end user. So, the level of difficulty required for
someone to independently prove that a given build of RuneLite is safe (eg. not
going to hack you) is approximately the same as before, and still certainly very
possible.

Hopefully it gets better from here...

\- Adam
