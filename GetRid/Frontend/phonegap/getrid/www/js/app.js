$(document).ready(function() {

  var token = sessionStorage.getItem("getRidLoginToken");
  var headers = {};
  var currentUserPosition;
  var productImage = "iVBORw0KGgoAAAANSUhEUgAABGQAAAHOCAYAAADey9/qAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHYcAAB2HAY/l8WUAAEXySURBVHhe7d09iyRXgqjh/iWi6StazdUuaGhk9MCyS09NXxBijd6ZhTYWcRE1RjeyBAPrNBRMIVswhgaEnGJsXWMsWeXuHxirrfkjcfMrIk5EnBNfGXmyMvMxHnanIyIjI7KqMs+rE5GPPvroo2KMx29+KD79/ueop6/i2+T217/+dSO2rN/L4rOvbooXX31b/NP/jiz/3/9RfJ5Y/r/+7dvVv6+WffGy8e9TffLF+vFvis//7VfR5Vvl80w818+/3i37uvgk/Pdgu88+D/99q9z3vsfQ9JviD7e3xW3oj78vfhVdt1Rv88ffd8/Dr37/x+TjVMv+8JvGv4/1mz+k99tVPs8/Fr//1djl4fn4Q/Gb9r+Vx/Sr3xd/bKwzV+Q5VI8de17h/mLPP5RaHhxPdNt6+R9+014W+M0fdo8xsB4AAMAJWyTIbN0UTyLb5XSMIFNHkMS2I00NMrGwkn6e/ce3VFSKqUJJQzo2pKPLr4rf/3G7fXSQXg3iUxGh36QgU+6rJ/6Uj1c/1zpG1PuIBIrFgkx5vurzEb4W3ecQ7G/W8a0NB5dp4QsAAOB8jQ4yKU/eBVHm/dvicWSdXI4SZFYD33/6/XpZrT+qxE0LMlOfZ3/IOcwMmZYqNNSig/boLI7w31Ohog42pSmD/imhIB6Z4nrjS/VvwbEuHmTq/W2O8Q+/3/57Fbx2zyEIYPOOL3isnihWnue5M5kAAADOxd5BZq2ePfND8fHz+Do5HCfIbFVRoyG9ftthg0z4/JrLqtkxK9FZN0trhJnYwL0OCeFgv4wEQ8GkGvA3pANB6fyDzHZf6+ezPdbdPsv9ZQoy1WMLMgAAwIVbJMh89Pxt8ezCg0ytno0yJXQcOsjUyxIOOTumLYgy0QBSXjJTRYLu5TfD6gBSis7I2ZkVZCZFhdxBpj6mzf4253S3n9353Rxrub/gWOZHk+EgM+U8AwAAnLNlgsyrm4ufIdMVXMr0+/8o/ld0ndphg0z5XL4tPvuinhGzNeWYllLHifjAvDWwj8ziGC+4lKln+0mhoBOMxjhekFkf0zaylI+52+/6+UeCzLzjW4scT0P3MioAAIBLtUCQeVF8/P5c7iETm80SzniZGC/KG/4eO8iUzyPnLJg+VXRID8zLmLAOBeWMjdmD+BGBoZoVMiZCjHj+XcsFmX/6P/+3+OabbzZ+9+v4Omt1kPn9dj9BdNkuW+33N5EgM+v41gaCTPk6DMWmaj0zaQAAgPO1Z5B5XTzdzIw5/uyYtflBJrzHSvCV0Z3LfLohZLNdNHQEM2RGhJAsQSa13cI2g/3U5S7BYL93YF6t98fij5tZFf2D+PQ+gxkyqee0NjECVMEotf768RpxZ6Eg80//p/i/uxiz9bvi17H1VqrI1NnvSnC8a+1jmH58az1BZvT5DV6v1GMBAACcgZFBJpgFE3X8GLO2T5Cpo0XX5//2H8kQUoeclCDwVLrfzJTSDDRzL1kKZ/mkLXVT33AwnzY00G4OzIciyfA+B2ZldEJAU3emSP/6Gw8qyLTOdyOMxc7v1ONbq48xqS+K7bRfy2mzdAAAAE7D3kHm6avY+sexV5BZ68yIKWNKfQ+WWAgJv6kolJ7tkjvIpJ9jx1KXNbVmYIRGD7Crxxg3S6I9I6Q0FHNCqcdIPufUcXbCw0JBZmXsJUuN59aJJyOD1+jjK6VCzrjXcKsZdgQZAADgHC1zU98HYu8gc6bqGBObrbMVvWTryKo4MmJWBeelniUzJeQAAACcDkHm7I28l011ydYDCTLBPWQMyC9LY5aSGAcAAJwpQebshZdHJS51Cu+f8xC+iSm8v4kB+YWI3H/Gaw8AAJwxQeYS9NywuOl4s2Oi927p3PeE8xUGmaEbMAMAAJw+QeaCpL8RKjFzJqN2kHEjVwAAAM6ZIAMAAACQmSADAAAAkJkgAwAAAJDZWQaZPrHtAAAAAHISZAAAAAAyO6sgAwAAAHAKBBkAAACAzAQZAAAAgMwEGQAAAIDMBBkAAACAzAQZAAAAgMwEGQAAAIDMZgeZJ+9+Lj79vunpq/i6AAAAANQmB5nHb37ohJiSIAMAAAAwbFKQacSY92+Lx5F1AAAAAOg3Psg8f1s828SYH4qPn0eWAwAAADDK6CBT3jPm2ZsX0eUAAAAAjDMyyLwunm5mx9wUT6LLAQAAABhrXJApL1dy3xgAAACAvY0LMq9utjfyffc6uJdMyH1lAAAAAMYaFWT6vuo65P4yAAAAAMOmB5nIZUvlDX/NlAEAAAAYNi3IrC9Ziiz/6KMXxcfvt1HGLBkAAACAftPuIdNzU9/haAMAAADA2rggU93IN/2119VlS4IMAAAAQK9xQeaj18XTTZD5uXj6as5yAAAAAEojg0x4Y9/2jXvr+8f0XdIEAAAAwNboINMIL1Hpy5kAAAAAqE0IMluNr8De8c1KAAAAAONNDjIAAAAA7EeQAQAAAMhMkAEAAADITJABAAAAyEyQAQAAAMhMkAEAAADITJABAAAAyEyQAQAAAMhMkAEAAADITJABAAAAyEyQAQAAAMhMkAEAAADITJABAAAAyEyQAQAAAMhMkAEAAADITJABAAAAyEyQAfpd3xUfPnzYuLuOLB/r6ra43zzOXXEdW37qDnF8wbkP3d9exdcHAABOxqgg8/jND8Wn3/88zvu3xePIY8DZyjlo3u1r3GNfFbf33edVmvUY97fFVXS9ERYOFtd35fO6L26vIutU+9vzeY8lyAAAABOcTJD561//uojYY8Ms4YA/YemBcxkhlggyG2NCxQOdIVMHmfj5uLq9r5afbJBpmfb6AwAAD9lilyw9ebcNMs/evIgu31csrswRe2yYrBVjYqFiHQQeSpBpP7+hmHEQiwaL8thW53j9fzvBZcGZPWMJMgAAwATLBJnnb4tnmxkyN8WT2PIF7BtUBBmWEw72Dzf4jlkqyKxVUSZHrFg7SJC5K243M2Faly3t9nV3fV3cLbbPAYIMAAAwwSJBppwd8+m719HlSzhskPm6ePnj34v//PGn4rPG/669/KK9Tai7/sZ3N8UnyXW3+/rs23L9X4oXn2/Xif1bxxc/7dYJfPt1fN3Q5zfFl+3tquNuy3leImLHmHyuO3PPyxTVJTyJe5eMEbs3yN11d71qkD9OM7z0B5n6kp5IQNj33iW9z3vZIHO921f43LbhYr2f/iDTuKypFHsd2uYe39jXPWFykIk+zyXOPwAAsK/9g0w1O+aH4uPnkeULyRZkohFgKxofetbfakeVel8vvvqlue53N8VnkX9rx4s62MSkg8X07XKel1Ai5JQSQWfueZkmmB0zc2ZJNTMlqjVYPsEg0398a0sEgSDIlP9/9XrsIswmdKSCTPnvKenYNvf4Jr3uCVOCzBL7AwAADmfvIJNjdsxaniBTCmPBy+LFd7t/j4WATXjoixkrjRkazX19+dXLzqyVzb9VQaP52J9UwSYVelaSzzO23dp624Fj2AnjSx1AIttOPi+l4Hy39rexPleR45t9XiarB/KjZykE6gjSHvAHgaAn9EwZkPcHmSAsjZihMXa/4YyTzj6ruLREDGiGlu1+d+d0F5O2+48FmeDY+16HyPOce3z7vu6l0a9/FdRiYWm9zyVeAwAAYB/7BZlMs2PW8gWZSLBIxJFB0e3CfZX/HokGVaSJbRuLKv3Lq2Ax6fKdgfMSLO+/dKml53ymw0qf+edlsmDGSnNAHg7yA43YUQ6+Y4PkMcuXCjJ9QSJu1H6rc5N4zEMEmTJi7B57/fw2z7U9WyZ8Tr2xYiX1Gs8+vv1f99LkMDbhcigAACCvvYJMrtkxa7mCTDQsVHFk4oC+N6rsZsK0/q3af2zbMmT0RJVy1krnOKoIMid0pINLub/6WEaInpe1enbMpMfb57xMlRqsjwkyZQjoGSSXA+7O7IvW8qlBJiW1n7Yx+60iQGqmRzJYzNEKMuWx3t9v9lE/z/Ic1LGjPJYxr0O4zuzjW+B1L41+/YeiEwAAcHTzg0w1O+bn4umryPKFtYPKP/7xj1FS2zcNzKAYDDLNy2y64kGmjgOR/UeiRT17ZFg3aHSf43D0GDgvK9VlSyMuP+pqB5nh/cXsd14mSgaZptgMhfqylWGpAffoAflGT5DpiQMxY/YbixgNSwaZ8rGCOFKf3zBCtINMfU5GvX7B4889viVe99L417/72o/7mQEAAHKZHWSq2THv3xaPI8uX9mCDTDXzpM9DCDJb9X1fQqkAMhxIkpdCTT4vaycQZKrLS/oHuA8tyNTxIRyoj589MSXIJNc5cJCJ/tvMIFPNMIkEmanHd5wgs1Wu32TWDAAAPATzgkzm2TFr/UFl2GGCTB1XunFhJRJVwm1mB5lJ94FJCZ/7VvdynoHzshK/ZGnOeVkb3l/MsudlSBA0emaZ9AaZnu2GTBuQp+JDHZWa8SJtzH7nBotZovElpn0OxgWZ6rVaMsjs8bqXpr3+oeA13+kNUgAAwMHNCjKP3/yQdXbM2oMMMkP3ZVk4yFT7W+TbgkrBZUWdxx0KJPW2jZgz67ys1Y83aSbLQc5LWjko7gsL0UF4ZNbFVNMG5On4UD2/yLKYMfsdCg/1PhcIMqPPZfccVK9fTyCJrTP7+BZ43UvTXv+Y+nws8XwAAID5ZgSZ18XTzLNj1k4xyNSXBy0UZKp/i81m2UMyaAycl9Txzzovw8uSDnVeUqqZECtDg/NwebDd3NkJ1eOOGkz3zQYJZkz0hInSqBBQ3Ug2ElyqZYnlgV9/82Pxt7/9beNPv4uvUz3e4HOPnIO+57mWep3mHt8Cr3tp/yCzUj5XQQYAAI5qcpCpZsd8f1M8iSw/lAcZZIIQ0LhcJvz3jYWCzEp4D5joLJJ1DInMFNlsN3Tj3c7ynvNSRZfI85h1XmLrxF6P1XNKHd9uuynnZa56NkRkAB4ubwWDaubFSnRQvR4s9w2Ug4H/8KC8L8iExzB8T5FxISAeeeqItP0GpN4g8+tvih93MWbrT8XvYuuV52FWTAov30nHk+5jzz++vV/3nbFBZrNe9NwEM2RGnDsAAOBwJgaZenbMszcvIssP50EGmaFvEfr2p93jLhdkBve5NhAs4iJxJHiuSUORJyZ6XgJB7ImKhpV552Uf4SA7qTPoDQbEKb0D8/7tm+GlP8iEgaE5wB/xHHfaYaAZqkLrSFHu79hBZiUMLzGJ12D+8c153ee/DsM/mz2vAQAAkMWkIFN9s1Lm2TFrDzPIbHVjRxkaysddMsjspKJFNJBspb6NKH2/lr4gkzhXgWnnpSsakYaiyozzsp/UoHlg1kkw06Vh5KyFVBiYFmTCxwkH6PNDwEb72KpjGhFkVsZcslQ977lBprUslDpXlX2Ob9Lrvt/rkPoZib5mAABAdrNu6nsMZVDZV+yxSYmEIgAAAGBvggw9BBkAAAA4hJMJMhyDIAMAAACHIMjQQ5ABAACAQzirIOOypKUJMgAAAHAIggwAAABAZoIMAAAAQGaCDAAAAEBmggwAAABAZoIMAAAAQGaCDAAAAEBmggwAAABAZoIMAAAAQGaCDAAAAEBmggwAAABAZoIMAAAAQGaCTJ/ru+LDhw+Vu+vIOgAAAAATTQ4yT979XHz6fdtN8SSybm5LBpnruzrECDIAAADAksYHmedvi2edENP07M2L+LaZLBZkrm6L+12Eub+9iq8DAAAAMNPIIPOi+Pj9Lry8f1s8Ti078kyZpYLM1e39dlbM3XV0OQAAAMA+xgWZanbMD8XHzyPLP3pdPO1dnsfSQcbsGAAAAOAQJgaZ1AwYQQYAAABgrOmXLL173Vn++M0P22Wdy5nyEmQAAACAUzD+pr6vbrbRpTETJrx/zHFnx6wJMgAAAMApGB9k1pLftHReX3tdfuW1IAMAAAAcwrQg05gREzr+7Ji1RYJM9ZXX98XtVWQ5AAAAwJ7GB5nG7JjdjJjWjJmnr1rbZDY/yFwXd5sIU7u7jq0HAAAAsL+RQab8FqWVzo17g2Un+y1LggwAAACQz7ggU93QNxFcgpkyz9686C7PZH6QCVzf7aKMS5YAAACAwxgVZIa/1rr/a7FzWSTIrLipLwAAAHBI04JM8tuU6suWTn6GzIqvvQYAAAAOadwlS+HNezuzZMJvXjrVe8g0CTIAAADAIY28qW84SybtdL9lqUmQAQAAAA5pdJDZCr9RKZC8t0xeggwAAABwCiYGmYdNkAEAAABOgSATUQaZD/e3xVVkOQAAAMA+BJmYq9vifh1kzJIBAAAADkCQSbi+2waZ0N11fF0AAACAKQSZPtd3ggwAAACwOEEGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACCzswoyPBRfFy9//Hvxnz/+Urz4PLa8xxc/rbZbb9v05Vcv4+vHBI/x8ovI8lO0xHkBAADgwZgcZB6/+aH49PufG56+iq/LpTpmkHlZvPgu2Pa7m+KT6HonRpAZ9l83xb//z//r+Jf/iqy7r92+fvvfL+LLAQAABkwIMq+Lp60Q0/DudWSb5ZSXI+0r9tgsbY8g0/LZtzPCwznOkGmZdV7O1uviX1oRpm3pKPPPf94+riADAADMNTLIvCg+fr8LL+/fFo+DZeGMmUPOlInFlTlij83SjhxkLoDzUmrGmFh4WccTQQYAAHhoxgWZVze76HJTPIksf/IuHmuWtG9QEWRyEmQOzXnZKsPIv//PTfHPkeWHIsgAAAD7GhVkyuDy7E1i8PH8bfFsE2x+KD5+Hlm+AEFmH2Ug+an4rPG/a/FLewbCyuc3xZfR5e3tWvd1WRl7KdHo8LDEPVaij1GeswPYY3/Tgkz39d4Yc3+d6jUOjXiOc7eb4l/fFr/dzYyZF0YSlzr9/LZ42l432NcYyRk5sfvc/Hn4cs+n//2X7nYN8SAV3a5nf+X61fnsHHdrP8Hy3llI1XHnDWcAAPCQjQgy9eVK6UuS6vvLHOqyJUFmH0GQSYSLtW4kWSDIfBEbmG+NiTJ5gkwiWJQWvzHw/vvb97zUEq/tSrmPuHRcmbvdVHVsmDHIT9wAuPaX4vN/DdZfIMjUs3liUscwfH+crfb2Q9u1jm8nDDLpCNTcV3VcydDzovj856F1AADg8kwKMskZMqOizX4EmX10A0AYQ+oBdHuwvG+QqY3bX9fo8NAyfrvm7J1OJFof46JBZpn9jT6+TZCJnefgNfr269aylSrkxF779baJ127udjNUISA2o2XIJsjEIkgQMnriwdRLluq40Q4hwf4ix1FHnOZ2YSzpxp8ggPTtL3L83QgTrJOakVTFrXjkqbdLLAcAgAs16ZKl9D1iBJmHLQwkqYHydnkzEJT/vk+QmbK/rkMHmU+++qXneS5vqf3NPS8NVTzpRpLqecZiTY+52013wFkXIy6vmRZkygiSChKp5XU86Z1x0z7+0YGk+7iNIBMJRNXyxj7r5xk7H9U2c8IZAACcsXE39a3uEbPS+Xrr4BuYBJkHajiAxAf4+weZafvrOmyQqWer7BU2Rltuf4sEmer1i8xa6Z3p0mPudpMdMMhUwWKhIFMGkhEzbpqBpD/kxONIT6gJpNYZiiep5ent6tcpFpUAAOCSjQsyK+HXW/fJFWT+8Y9/jJLa/rIMhJWVcoDfnNmwb5CZur+uwwaZ4ee5rOX2N+28dG+q3BS7jKi7zdx97RWNkpYIMuGlPTHLBJkqVozQfLw5M2TGBZDBsDL1nKYuSxoRtwAA4FKNDjIb4UyZyvqblcpZMvm+ZSkWX2JS21+W4RAQv9TkcEFm7KUtgkzc6PNSzVjpk76vS7mfpuHnP3e78fYMMtVlPX2OHWSC6NIKHeFjNsPLyBkp5fEvFWSC/YbHUD7emPMEAACXZlqQSSq/ZemmeBJdvr99g4og0z8gjg/wDxdkxgaF0eGhZdx25x5kyv2tRaJL3yVLHeFjbQ3d/2dr7nbD6lgxdfZFPfMkuu3ClyzNjxwrwf1eojqPeaQZMmudyFM+l8S9bAAA4MItE2Re3Wxny3TuL7McQWYfQyGgvsykOVge2G52kEntr+uwQaZ+HlMff57l9jfq+Ibu5zIpyJSCS5ImffvU3O16BLNcemeDtFXbDd30dpkgk5qNMqwOGv/y510oqaQjRxWqeqJKap29gkz7njfleZx83AAAcBn2DzLVZUyHu1xpTZDZx0AgSQ7c69kN3XBSL5scZKr9DYeAwwaZer1pUWK+pfa3RJCZ/VzKx50aVuZulzQw0yVlIMiMmXmTmmESFcxymRWOpsaR6vgSz7/n+ewXZJqhp3ysSccMAAAXZI8gk+fblUqCzD56Akk1aI8P7qOD9mpmRWlCkBnYX9uo8BAxervGscTCxepYFgsIKwvtb9TxhfsK79XTef26QWbz+NH7+wQzXSLL5243WxUf1mKBZTvLpBEFwsuAwvAQ/vtGT+QJ9jtmlkwdeRLrrx+vHXeqfaRnw8T1hKrUse/sG2Tqx/9L8dvN7J4JoQwAAC7MyCDTjC9th44xa4LMPspA0iM1SA4CStuXX90kwsvc/QWD9gHNEDF3u52eY9xYMsisTd7fgc7Ltz/tXqdEkGmv3xCfVTN3u700okxcc5ZGfZ+VqD/f7IJGX0zof4zurJCBfa51ZtuEYSUtOgOlE5daEjN79g4yreN0M18AAEjbI8gc9hKlNkFmH32BJDZLoyU5o6Ic8MceIxUD+vZ3oPAQ6JtREo0JS8eYwPj97Xd83f2Ur1/5cxGPJNU3YbX0ncO1udvtK5yFUhtxr5VKGWDKEDI8u6MKGC3Jy3RS8SgRQFKP35HYPnZOks9tZf8gszJ7Zg8AAFyWZW7qm0EZVPYVe+zzVw68R8QX4EGoY0w6DNXB5eFcGrRI1AEAgAsgyFwEQQZOS3DpT1/YqGajPJAgE9xDxuwYAADodzJBhn0IMnBawnuxJOJGePnTQ5iNMnDDYAAAoEmQuQiCDJycETcr3jre7JjoPW7GfBU4AABwXkHmsi9L6iPIwKmK36x47fiXBbWDTN8NgwEAgCZBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0Hmkl3fFR8+fKjcXUfWAQAAABb36On3Pxefrr1/WzyOrNDx6ma7fuDZmxfxdTMTZMa7vqtDjCADAAAAeT2qwsqIIPPkXTPENIwNOgckyIx0dVvc7yLM/e1VfB0AAADgYB5VkWUgqDx+80MVX56+CpaFM2bevW5sk5sgM87V7f12VszddXQ5AAAAcFgjg8zrory0qRFjdupY80Px8fPu8lwEmXHKIGN2DAAAABzHuCBTzoJJrlMHm2PeT0aQGUeQAQAAgOMaFWTKdVKxJbyc6ZiXLQky4wgyAAAAcFwjgsyL4uP323W6lyvVyyq9lz4dliAzjiADAAAAxzU/yIQ3811vO3hZ0+EJMuOUX3ktyAAAAMBxjAgy3Rv6VtusVJcxCTKnofrK6/vi9iqyHAAAADi4iTNk6jjT+UYlQeYBuy7uNhGmdncdWw8AAADIYVKQqUTWrW7sK8g8QIIMAAAAPCQjgkziEqXUOr5l6WG7vttFGZcsAQAAwLGMCjLDs1/6vokpH0FmHDf1BQAAgOMaFWQ+ev62eLZeJxVcqm9cuimetJdlJMiM42uvAQAA4LjGBZmV8LKl1Ndfpy5nykWQGUeQAQAAgON6VMaUtm5cidzcN3TEe8eUBJlxBBkAAAA4rglBZqu6n0zgmPeNCQky4wgyAAAAcFyPYv94qgSZcQQZAAAAOC5B5gKVQebD/W1xFVkOAAAAHJYgc4mubov7dZAxSwYAAACOQpC5UNd32yATuruOrwsAAAAsS5C5ZNd3ggwAAAAcgSADAAAAkJkgAwAAAJCZIAMAAACQmSADAAAAkJkgAwAAAJCZIAMAAACQmSADAAAAkJkgAwAAAJCZIAMAAACQmSADAAAAkJkgAwAAAJCZIAOTfV28/PHvxX/++Evx4vPY8h5f/LTabr1t05dfvYyvHxM8xssvIssfilN5nsd2dVvcf/hQfPhwV1zHli/l+m61j/V+tu6uI+tADn4WAQA2Hj39/ufi07X3b4vHkRXiXhfztjssQYY8jhlkXhYvvgu2/e6m+CS63rFlfp678zopbE12XdwFg8ik+9viKrp9QoYgc33Xeo4rZzEIzvK6n6CHfl5aQWbj7jq+LgDAGXu0iSqjw8qL4uP3u/UFGS7WHkGm5bNvt8HCDJn9zDqPk51okKke/0Nxf3sVX+dE5XndT88pnZer2/vd7859cXsVXwcA4Fw9evJuXFh5/OaHOsK8e12M3S4nQYY8jhxk6DjKeVwqpBw4yFQD3jOcgeD3J+7Uzks5g+vcgiEAwJBxQeb52+LZLsY8fbX9N0GGyyXIPDSCTFoZZM5xsOv3J+7Uzss5/4wCAPQZOUNmfanSD8XHz+t/E2R4OMpA8lPxWeN/1+KXzAyElc9vii+jy9vbte6XsjL2Ep3RA6fg8p/QpAFX9DHKc7aQWc9zxutXvTbjHOSSqTkhpdom5vSDzCdf/RI9/7XEz1vs5+bbr7vrLfm6B/cxOfj9dKLPe8Tv3rmflx1BBgC4VKMvWWoTZHg4ggF9IgisdQchCwSZL9IDoTERIE+Q6QaOhiVvuLtvkBn7+p1gkIndWLfplIPMwM9YpRshyt+BuNb6i73uV8XtfXDup973Z4JJxxc49/MSEmQAgEslyHAGuoPBcMBRD2zag58grMwKMrVx++sq150002Vl/HbN2Tudgdj6GA/4DUjjnmf7fIbnO3j+Pc9z7nncy4QgUw441zqzDs7gkqX6Z775uxLOmIlFgHp5z+/YQV73TOGhCoyxvzHrY4z/jTj789IiyAAAl0qQ4QyEA/rUwGe7vDkoLP89ts3KqCAzZX9dcwdOY7dLD+zyGPc8B85nNagdnk0wfQC6h7EhpVov8S0yBw4yh79hav/Pe/nadC+1Gfj9G1y+5+ue4dKc6vcvdplR0vmfl7YqWPrqawDgwggynIH+AeFafIAyMLAZEWSm7a9r7sBp3Hb17JJZA7MFjHueA+cz+TrU5p7HvYwMKdVgMzXb4JBBZigGLaL/9ygZJcrQ1hMrytd139+zo+mdIZNwCeelrfo5zReBAAAeAkGGMzAQVlbKAUpzkLNvkJm6v665A6dx2w0/z0Nb5HmeeJCp7h2T+q//iweZ6+JuN7gtHXaQW75+8UCQ+l2oZ28NS72uR3ndJ+ne8HvouV7GeYkIZuZsHTIiAgA8DIIMZ2A4PMT/K/3cEDB3f11zB07jtht+noe2yPM8kyCTvGTo5INMff7br1EYF9qx5pLCQ31+QvGf54sNMsEsmS1BBgA4f4IMZ2A4PMQHKIcLMmMHRHMHTuO2E2QO6sEGmUA16+DAg9vqNUqIhMmx0bLPUV73vZQ/67VkqLqk81L9DogwAMBlEWQ4A0Phob5soDn4mRsC5u6va+7Aadx2p3YPmamvQ+0oA9CRIWXohqXV8kMEmZXD39S3/Dn7pXj5bXt2R/o1q+6Vsse3fJ1ceKgElzK1j/8Sz0sZDt3UFwC4MIIMZ2BgQJ+8sWa5XSyc1MvS2w3t7/hfe12uN+a5HMK457l/kKlmFewxiJ1s7MyWapZKZL3GfTMOE2QO/pXCI25CGxXMqhkKlyl7ve7BuT9crOqRCi8XeF4O/jMKAPBACTKcgZ4BfRVH4lEgGiyCAdHWhCAzsL+2QweZ5rHEgsbqWA4YMXIFmannfRGjLzUK7ukSzACov33p/nCXLK1kCzJ9r09C/fuXeN3Wj9338zn7db8qbu93r8nGYS6V2RxfNFQFM2Qiy8/9vLQJMgDApXq0iSoRz968CFZ8UXz8Pr5eW3O7vASZS1UO6Huk/ut9MHBp+/Krm0QomLu/YBA2oDmImrvdTs8xbiwWZOY+zwWCzMC+5840aOreLDcq8vXWVXzpWEeY8nFPNMiM+X1Yib8GI35men8+57/u1bdf7RzixsdhWIlLzVw77/PSJsgAAJdKkOEM9A0IR/xX+86MmHKQVA5qYo+RGvDMjwahRYPMTnRwuFiMWZv7PJcIMlvVpRotxw4yG43Lk1aq2TKnHmTS571jahhNrd8y73Vvvp6HCg+p59b3u1o54/MSEmQAgEv1KPaPp0qQuVQDA3q4YIce7NaD/vR9iuoYeJx7GaXUs0F8u08o93kRZACASyXIcAYEGUgpB7vJmTt7CWZF9c3aqGZ6PJwgU52XNd/uUznGeTn8N4EBADxMggxnQJCBpOrmw4cY8IaXqSV+/8LLbkZeanM4kcvOxJiVI56X4FK+HJdHAQA8JIIMZ0CQgT7tG7UuOvgduml05SHMjgnDw2Hu2XOaMp+X9v2U1oQxAOACCTKcAUEGBrUGwUvPRkh/o5DfS1paP4suVQIALpUgAwAAAJCZIAMAAACQmSADAAAAkJkgAwAAAJCZIAMAAACQmSADAAAAkJkgAwAAAJCZIAMAAACQmSADAAAAkJkgAwAAAJCZIAMAAACQmSADk31dvPzx78V//vhL8eLz2PIeX/y02m69bdOXX72Mrx8TPMbLLyLLmcb5hNN1fVd8+PChcncdWQdy8LMIwAyPnn7/c/Hp2vu3xePICm1P3u3WDzx9FV83N0GGPI4ZZF4WL74Ltv3upvgkut6J2p2fSYFqL2d+Ptdag4SDDhZ2+7q/vYovZ8B1cdd6nfrdFdfRx7kM13fdc3IWg+DsfwdPxEM/L7G/tXfX8XUBYOdRFVaGgszzt8WzIMJ0vHsd3y4jQYY89ggyLZ99uw0BZshszTof+zrb8zk8uF968FoOkAWZuQSZ0a5ui/vdeTi3n7ej/B08Aad0Xq5u73e/o/fF7VV8HQBYe1TNeOkNMq+LaiZNK7yEM2aOPVNGkCGPIweZM+Z8LKU5sI+Fl3U8EWROQBUeLns2TFs14D3DGQj+Dsad2nnx9xCAMUYGmZVXN8WzNy8iy14UH7/fPcaRZ8kIMuQhyByK87GM+lKOvIN4A5ADEGSiyiBzjj9r/g7Gndp5OeefUQCWMz7I9FjiMZYgyFyqMpD8VHzW+N+1+KUoA2Hl85viy+jy9nat+5CsjL30ZfQHzOCymtCkD6bRxyjP2cKqczewr+h6ae3z+slXv2z+vToPncdLHN+s8zn356xWPt+0BV6PvS/lSFw2c39bXLXXDfY1RnJGzsx7L9SXBaTEI0Z0u579dQZWneNu7SdY3jsLqTruntgyJsjstb/y9S7/rfv6D86kOsK9M3IOdmf/3sb+znz7dXe9Pf8ONgSvxdIz4DrG/p1vO/fzsiPIADCGIMMZCAbKiYH2WvfD2gJB5ov0B8ahwflaniDTDQcNC9/ItjymuNaH9T0/cIdBJj1oigwQ9g0yk37Owm2HjBjMDKhjQ88APiU2sG5o3Q9hgSBTz+aJSR3D2HuttLcf2i5+v4dwYFWf37bmvqrjSoaJq+L2fmidlTFBZmX+/oIg0/P6pwax816//eUZ7M7/vc35d7AWvMZrsYi6kEnHFzj38xISZAAYY4Eg45Iljq37oTn8YFZ/AGx/SCy3mxtkauP211WuOy6s1MZv15y90/nAuj7GJYNMFSpi53R93vrPydTz0Y0wweMHH+aHHm/cftuve3iMwXmOnM/6Z6J5XsLnnx5MTFMNkOcMOjYD8tggOggZPfGg3PfYAUgdN9ohJNhf5DjqCNDcLowl3YAQDsp69hc5/m6ECdYJolTjuKu4EY889XaJ5aWRQWb+/rqRKjx39bnuOy89j3mgwW+Owe7c39t6ec97R8/f3al/B2uZwsPMv/Nnf15acvyMAnD69g8ywbcvuakvxxEOlFMfELfLmx+ey3+PbbMyKshM2V/X3A+YY7dLfwA+jGp/sennI0w9H+HAKPZBfuzzGbffgde9GqSkwl/856Hc99xz1hQMPPpmXcxRDfjTYWBakCkH7akgkVpeD/Z7Z9y0j390sOg+biPIRAZz1fLozJP4+ai2GRocjg0ys/dXbxc/N6nzXf771NdvGVPj33Rzf2/L7VJ/c4eWT/872FD9nMd/P5Yw7+/8+Z+XtvjfBQBo2jPIBN++dOTLldYEmUvV/8F5Lf5BbuAD4IggM21/XXM/YI7brp61MesD7By9/+V02NTzUQ0MEv9VdWh5adx+B173wZ+X+DmZN7hJOWCQGREGJg2SywFSz/MsH29KCEgNgpKhJpBaZyiepJant6tfp8HB4eggM3d/qeBSi76us1+/BSRn+yxp5u9t+Tew5/e5/Huz7/vH0cz5O38J56WtJ/ICQGmPIBNcqvT9TfEkuk5egsylGggrK+UHueaHwYHtZg6w1+L765r7AXPcdsPPc3ndGxxPObap52OpmLHI+ZwZ8Mb+rIyzRJAJHiNqmSBTxYMRmo/XHxDiUWVcABkMK1PPaSocTIgs89adsr/hmSyxczr/9Zurft1Lhx3kzvu9rf4mjZD6ezP172B+0//OX8Z5iQhm5mwdMiICcIpmB5lqu+9/KD5+Hl8nN0HmUg2Hh/jAfd8B9tT9dc39gDluu+HneSjVYKVh+HlMPR+nEWTC89FcFg5SUv9VeJo9g0xn8BBz7CATBILW4CZ8zOZgfVyQqY5/qSAT7Dc8hvLxRoWKKUFm1v6Gg0zs+MNzPWTUcQ7KHWTm/d6Gy4ak/t5M/Tt4LPX5CcX/Pl7SeWmofn9LggwATbOCTB1jjn/fmJAgc6mGw0P8g9zhgszYD45zP2CO2+54QaZWPodaX3iYej5OJcjUyxL2fP6hOlaMGcCHwgFvZNsRYWBWkJkTjjqDnJbOYx5phsxaJ/KUz2XkwGxSkFmZvL/xM2RikWfWOdlXFQ4PPLid8Xu7xN+kue8LxzP8d/4iz0v1uyvCAJA2Ocg81BizJshcqqHwUE+vbn5InDvAnru/rrkfMMdtd4R7yCQFU9wX/BaN0wgy5bH/Urz8tv1fiVM/Q3sIZrlMmkEwNMhdOMh0w8FYdWC4u2vP0hiOCn0BIbXOfvGhFTzK8zj2uKcGmcn7GwoyiZg1+/VbxqSftVlm/t6W90oZuG9Vn5MLD5Wev/OXeF7K35FjREsATsakIPOQY8yaIHOpBgbKyRsQltvFwkm9LL3d0P6O/7XX5XpjnsvBjfhAXgWWkR/aTyLIlMe953Mcb2CmS8pAkKliRc9jpmaYRFWhYWY4mjrIqY4v8fx7ns++s0HC0FM+1uhjnhxkpu5vIMikfi7mvn4LKY/rYEFm7u9tMKtmKMinTP072FC9XoeMVT1Sf+cv8Lwc/GcUgLMwOsg89BizJshcqp6BchVH4oPtaLAIPjhuTQgyA/trO3SQaR5LLCSsjmXOh9uEzfOKDmCC/3LaN8CZeP5OKsiktjuEYPARH2hvZz00BtLBALsRHsJ/3+gJAxMHPXXkSay/frx23Kn2kZrRkdITqlLHvrNvkKkf/76438w2GR9X6m3nbDNmfz1BZuD1nPX6LSRbkJnxe1u/ryT+pqwfu+/v7sS/g7V6NtPW1N+Rceb+nT/389ImyAAwxqMysrQ9e/OiXvH52+JZZJ2od68bO8hJkLlU5UC5R2rAHnzAa/vyq5vEAHzu/oIPqwOaHzbnbrfTc4wbSweZ2D4qQzN1+o+1/V9W5wWZuedzZpAZ8/OyMve/GicFg+mU5syG9qCl5e5uN3DvG9z3P0Z3JsXAPtc6A/owrKRFZ2104lJLIh7sHWRaxzlpgDYnyEza34jzmTzuOa/fMg4/2N3n93bE35jev7vT/g6Gwki2dojZS/P/zp/3eWkTZAAYQ5DhDPR9cB7xXzc7M2LKD5Plh7/YY6Q+GPbtb8SH0Z1Fg8xO9EP0gjGmVEWSlr7n1pZ6jNMMMunj6Zh0HOO0ByJb6f9C3F2/DAHlwH04DFQBoyU5CErFo0QISD1+R2L72DnpG6DtH2RW5s7smRVkVkbvry/IjHyuE1+/JeQY7O79e5uK4SN/z8f+HWxqvp6HCg+p5zbq7/wZn5eQIAPAGI9i/3iqBJlLNTBQhiOqBw/p2UF1LBuaQUQdY9KBog4uEyPGAS0SdSYYv79yoJrnMo6lHHqwe8q/t/XP/2m9poeW+7wIMgCMIchwBgQZHqpgNk7ff/2t/ouxINMvuESmLzRUMzYeSJAJ7umSZYA8aX+nHWQOc0nU6f7eVudlLVP8OwXHOC9lABJkAOgjyHAGBBkeqvDyqMTPZzh9f+SU/csV3rMkERDCy2cewoA0vG9NjuczeX+nGWTC41x+wHtqv7fNy3Gy/aw9eEc8L8HfoRyXRwFwugQZzoAgwwOWul9Ch9kxo6TuV9JxvNkxjf8aXzrQzW3X9tvfiQaZlan3AprkpH5vw/DwcC7TO77M5yX2t0kYA2CAIMMZEGR4+NLfTOLndo7YYHzr+GGhHUgO/V/I99vf6QaZjdYgeOlz7feW0Vo/iy5VAmAMQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBib7unj549+L//zxl+LF57HlPb74abXdetumL796GV8/JniMl19Elp+6cz++KZb4ecntv26Kf/+f/7fxL/8VWc5x/Ovb4reb1+Wm+OfYcs7T1W1x/+FD8eHDXXEdW84413erc7g+j1t315F1IAc/i3B2Hj39/ufi07X3b4vHkRUaXt1s1234ofj4eWTdIxBkyOOYQeZl8eK7YNvvbopPouudqszHt3s9HmzgyB1k9h60vyg+/3kbYzZ+fls8ja63kF38+e1/v4gvX8Tr4l/K44n58+vINg/QQwwyWV6/ua6Lu2DQ03F3HdnmAXqIQWY3oLy/vYovf2Cu71qv/cpZDIIf+vvfsTz089IKMhun8vcIiHpUhZWBIPP4zQ+tENP07M3xP1AJMuSxR5Bp+ezbGQPsYJBuhsx+Zp3/Izr4811i0J5xhsw//3m7n6MGmZ0HPxvoAQaZPK/fXANBZufBD8wfYJApA8dJBJnq/J1OQBrr1N7/cjml83J1e7/7W3Rf3F7F1wEevkdP3u2iypgg8677XwKr7R/ATBlBhjyOHGRYjCDTcmKXteQNMn8pPv/X1rIgPj34cybITFQGmchAp/FfqB/4pUCCzF6qAe8ZzkDw+SPu1M7LSQVOIGp0kEl7UXz8fvsYT1/FlucjyJCHIHMuBJmWSw4yv/tT8bc//S6yrCfIrFXn7KGGhZ0zCTK//ubHxOu0tJ4gs3YqMycEmb2UQeYcB7s+f8Sd2nk5559RuBSCDGegDCQ/FZ81/nctfunLQFj5/Kb4Mrq8vV3rvicrYy+1Gf3Gv8S9RKKPUZ6zPVXnauDYq+fQOqczj++Tr35prhc8j63W8XWW92sey9yfl1L353Jjwn1yHmyQacwUqY0eaAdRoxZ5DtH10sZeRvS7P/2t+Nvftn785tet5QNBJrxvTut+Mk//+y+bf6/OQ+f595/ncvuGMfes6T1P7X2ODU6p49+J/gy09rXv6/frb4ofd6/T3378pvh1uGxxA0Hmo6vi9n4bFtqzJzoDpCDebPXHkfoyhMCYGRqd/YTa+xwbnAYuhYjdz6K9r97n1XWXugws+jiHDU05B7vl+1la4v069v757dfd9fZ6/2sJXvfk67WU6PMe8dnl3M/LjiADp2+BIPO62N4Y2CVLHEs50F29QScG9mvdN9EFgswX6Tfy3jftnTxBJhECSgvdOLc8lugHnp3kOgsEmfSH2eCD214fvOb+vKz0/FxuJR6z5RyDTDlLIm7hAX3Hr4tvfqxjzJ9+F1tnKMgEx9C6iXEYZKJxZSN2rst9pox4LklLB5mB5xqek0Vev98VfyqjzN/+VPyus3wpQ0EmuNnr/W1xFfx7OECKxpWNWEgo95ky4rkkLR1kBp5reE4WCDL9x3e4KJNnsDvwHl3pRojqPTWqtf5i4SGIkWutn/8lTTq+wLmfl5AgA6dvzyBTxhg39eWYuh9mwjfM+o25/eY9d4A9d39d5bpTB9jjt2vO3ul8kFgf41LfZFRFh9Rx1+ct/YFma+zxdSNMsO/gQ1bqcaad/7k/LyubcxM7L8HPUk/IKs39eRltbpBpGX0pShVyYoP99UC//3nMueSlNnZgPxRkhmfI1ILjCeJE8/mH31TV3mcYP7rnJtxfJ2YkX9t9gkzzW7Wi++z5pq35r18Y0n4svvl1bJ19DQWZ4RkytSAYBHGiOYAKB3PtfYbxoxsfwv11Yka1vyWDTHPgGd1nz2B08iVL1ayD2HNZH8dpB5ny73r7vSN8f4u9Z9bLez6j9Ly/z38/yRQeqs8Usffc9THGP2uc/XlpEWTg9E0MMnWAqfnaa44teJNNvnFvlzc/1JT/HttmZVSQmbK/rrlv/GO3S38wOYSB4y4/XI0IQNOPL/641fJE7Jh2/uf+vAwYDFm1+R8UR8ocZKqAMPOro2cP6Nf3iyljzOClL2ODRTdINIJMJExEj783Uq2k9tcbTsLlywWZ+vgS2w7YL6g1LzWLz27ax9hg0Q0SjSATGZRVy8OQ0xsdVlL76w0n4fLlgkx9fIltB0wNMtHzlcnkeDRZ//tm+Te/+x428H40uHzP95MMl+YMvX/Hnf95aTvm7wewjAWCzJYZMhxP/weatfgb7MAb84ggM21/XXPf+MdtV8+OmfXBYoa+D1BTjnXsutX+EpFnaPm08z/352VAtd3lBZnB+DBgzoB+c1PY3SC+e7+YmJ5gEV6q1RdcErNEYsvLY+qLVLF1hva1fJCpZ8fMDSr7Bpm18PVc9ma/PcEiGHT1BpfEfyGPLa8uyekZVMXWGdrX8kGmngUwN1IsO0PmgIZi1yL631eS76llyO+JFeX7xb6fU46md4ZMwiWcl7bq5zRfBAKWtfc9ZDZfh/1Aoowgc6kGBsor5Rts80163yAzdX9dc9/4x203/DwXt8c5C409L/P+C1pt2vmf+/NS6t78uekCg0zrkpepg/OpA/p5MyrKYNFjKLiMngFUn4/4/VO2ZoWcxYPMwHYjLBFkNibNeBqrDBY9hoLL6P9iXUeOvgHVrJCzeJAZ2G6E6bNOWpeCTNp2qu7rfthBbvm+Mm2GTPXeN0Lq/eLg7yd7675njv5MMMLpnpeIMBJvZI6XwF4WuKnvyqubXZS5KZ7ElmciyFyq4cF+fOA+d4A9d39dc9/4x203/DyXl5iVM+FypbWx5+Vkgkz1X/r6XGKQ2apiQsPwQH/SfsJv6FksyPQ/x0MFmWpmTiTIJM/FOQeZxmu71D1l+oJM/2DnUEGmGnRFgkwyUJxFkNmq4lPD0gPP3EGm/rvefu8I40I71lxSeKjPTyj+PnxJ56UhmCVzmN8L4JCWCTKrD2YP4ZuWBJlLNRwe4m+whwsyY9/Q577xj9vuGEFmJRJfyuebmiLcNva8nEaQKbdbi0SXarvLDTK1bvzoCxNz9jP9Epf54eEYM2QuLsiEs2NyXbI04BgzZC4hyNQyRZNcl0pV7wEJkfe3fd/71g7+frK48L10KxmqLum8JH9XgVOxTJB5/rZ4ZoYMRzMUHupZG803730H2FP31zX3jX/cdonZKgfXPj/l/x4ODqWx5+UkgszQdfCCTERwKVPqnigrs/ez5E19e0wPMvUx9W0TW2doX9XyxYJM/RrNfZ33/Tk56k19e0wPMsHsj55tYusM7atafsr3kEkKLmVK3UNnT8s915TyffqX4uW37dkdqc8YKxNnncYc/P3kYOrPNp3jv8TzUobDCX9vgIdlkSBT3Udmr1k2+xNkLtXAQDk5IC63i4WTell6u6H9HW6APXa7cr0pMWQJjedXno8J0WTs8e0bZKrtR314m/nzkvz525ryGo09L7M9mCCzErkspy02U2S8pb72Om1OkKlvFJx4DarXqDWLpm+78ObDySATm5VTL4sdfxWGZv68zH/9HsLXXqfNCTL1bIx2ONkJLklozAbp265aFltezzJpPF5rWez4qzCUeq4DYjN9ZiuP8UBBpnyuBwsyM94fN4JZNUP/4Sdl2vtfS/CzdbhY1aM8b+3nfoHn5eA/o8DB7R1kqu1Xnr6Kr5OLIHOpegJJNRiOD2Kjg+HgDX1rQpAZ2F/b3AH26O0axxILAqtj2eO/JCUFHzK3zzUeI1LGHt++QWbu6zXp5yVcHj7PznaXF2Q260VjRTBDpi9mBKFhXvwJB/apWRaZg0wjgrRehyDGdB8z2C5YVkePvyRf22hYCfe1ETn+xjqx87N6Tn2xZdbrNzak7StzkGlEkFboCGJM9zGD7YJldfS4323bjSfRsBLuayNy/I11Yudn9Zz6AsnEQevmeUbPZTBDZtK5Hi9bkJn4HrlWvx8l3hPWj933/j7x/a8WnPeN6b8jY2yOL/reHsyQiSw/9/PSJsjA6XtUxpS25jcmpb/uunTsGLMmyFyqcHZCQmrAHrzxtn351U0ivMzdX/AhYkDzQ8Dc7XZ6jnHjEEGm/Zx79zH/+PYOMgP77vwXtlk/LwPH9+1Pu+3aQWbP132OziA8rjl4DuLJgPaguw4BKUNhqH/fvTfGDYSXvnS/Cjt3kFkZeh0SkaPaX8f6PJbHETmnjRk0Tb/977f9x9+z7Ubv7JeJr194897Fvk0pJXeQWenEkJZE5Kj217EOLeVxRGazNGbQNN3f3vYff8+2G70zVtoD16a71oydOhylRI5tIYcf7I74PLESn+0x4j1ij/fevhkm7dek/ZotIQwrcan/iHHe56VNkIHTt3eQOfZXXYcEmUvV94FmxH91Ss5UKN+UY4+ResPu29+IDwk7iwaZneiHm4PEmK0qlqz0B4P5x7d/kNkKn2so+sFr1s9L7PyX25U/v5cXZNZSEWH8jIn0Y4wNMhvr+8pEbwp7hCCzEwtWg8fUDiTVvnuCzFrntS/XK1/f/uOPxrWRlyJNef02N2Ve9Oa9KUcIMjuxADE4sGsHkmrfPUFmrROByvXKaNJ//NFYMvLyoVRIih1rat1DD0JzDHZT7z8dU//D0sj3xUnvf5Xy52rrUOEh9dxGveed8XkJCTJw+h7F/vFUCTKXqhzQjogvAAAjHHqwWw/6U7M9wpifXucY6hiX59KcU5H7vAgycPoEGc6AIAMALKuamXOQmwYHsyD7Zm1UMz0eTpCpzsvage7fc4qOcV7KACTIwOkSZDgDggwAsLDgkq7lB7zhZamJzy/hZTd7Xpq7v+blODmjw8N2xPMSXKqY4/Io4DAEGc6AIAMALG/WPX3G6rlRfNNDmB0ThofD3Uj59GQ+L7EbagtjcNIEGc6AIAMAHEhrELz0bIT0Nwr5XENL62fRpUpw+gQZAAAAgMwEGQAAAIDMBBkAAACAzAQZAAAAgMwEGQAAAIDMBBkAAACAzAQZAAAAgMwEGQAAAIDMBBkAAACAzAQZAAAAgMwEGQAAAIDMBJlLcX1XfPjwoXJ3HVkHAAAAyOLR0+9/Lj5de/+2eBxZoc+Td7ttZ26/NEGmRyvIbNxdx9cFAAAADurR7KDy6qaOMYLMSbm6vd9Fmfvi9iq+DgAAAHA4j6pZLpOCyuuinFnz7P0PgswJur7bzpK5v72KLgcAAAAOZ1aQqbZ597p4/EaQOUXlLBlBBgAAAPKbHmSevy2erdf//qZ4svrfgsxpEmQAAADgeCYGmRfFx++36z99tf03QeY0CTIAAABwPJOCTBVf3r3u/psgc1IEGQAAADie8UGmdalS+e+CzGmqvmnJV18DAABAdiODTPdSpZIgc6Kubov7dZBZubuOLAcAAAAOZlSQiV2q1FkmyJye67vtLJnKfXF7FVkPAAAAWNRwkKkuVfqh+Ph5d7kgc8KCWTKCDAAAAOQzGGSq4DJFZCZNDoLMBFWMEWEAAAAgN0HmUpWXK7mpLwAAAGQ38qa+aS5ZOk2+9hoAAACOR5C5UIIMAAAAHM+jTUyJePbmRXSDNkHmNAkyAAAAcDyCzIUSZAAAAOB4HsX+8VQJMuMJMgAAAHA8gsyFur5bf+W1IAMAAADHIMhcovIrr1furiPLAQAAgIMSZC5FEGEqd9fxdQEAAICDEmQuRSvIuFQJAAAAjkeQAQAAAMhMkAEAAADITJABAAAAyOwsg0yf2HYAAAAAOQkyAAAAAJm5ZAkAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQaZ0fVd8+PChcncdWQcAAABgAY+efv9z8ena+7fF48gKpcdvftiu1+Ppq/i2uSwZZDburuPrAgAAAOzhURVULj3IBK5u73dR5r64vYqvAwAAADDXoyfvdkFlbJB59zq6/CFYKsisXd9tZ8nc315FlwMAAADMJcgklLNkBBkAAABgaYJMgiADAAAAHIogkyDIAAAAAIciyCQIMgAAAMChTA8yEcf+dqXSIYKMr74GAAAAlrZIkNm6KZ5EtstpySDz0dVtcb8OMit315HlAAAAADONDjIp1fZ7PMZSFg0ya9d321kylfvi9iqyHgAAAMAEeweZtXr2zA/Fx8/j6+SweJAJZskIMgAAAMBSFgkyHz1/Wzw7tyBTxRgRBgAAAFjWMkHm1c35zZApL1dyU18AAABgYQsEmRfFx+8XiDoLWDLI+NprAAAA4FD2DDKvi6ebmTFrx50dsybIAAAAAKfg0TamdD178yJYMZgFE3X8GLMmyAAAAACnYO8g8/RV8wGPSZABAAAATsGj2D+eKkEGAAAAOAWCTML13forrwUZAAAAYHmCTEz5ldcrd9eR5QAAAAB7EGRKQYSp3F3H1wUAAADYgyBTagUZlyoBAAAAhyLIAAAAAGQmyAAAAABkJsgAAAAAZHaWQaZPbDsAAACAnAQZAAAAgMzOKsgAAAAAnAJBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgM0EGAAAAIDNBBgAAACAzQQYAAAAgq4+K/w8DWQObefghXwAAAABJRU5ErkJggg==";

  function appViewModel() {
    var self = this;

    self.itemData = ko.observable();

    // VIEWS
    self.showSignInSignUpForm = ko.observable(false);
    self.showGetRidForm = ko.observable(false);
    self.showNavBar = ko.observable(false);
    self.showSuccessfulGetRid = ko.observable(false);
    self.showSplashScreen = ko.observable(false);

    // SIGN IN bindings
    self.UserName = ko.observable();
    self.Password = ko.observable();

    // GET RID bindings
    self.Name = ko.observable();
    self.Description = ko.observable();
    self.Category = ko.observable();
    self.ImageURL = ko.observable()

    self.displays = [{label : "All"},
                     {label : "Category"},
                     {label : "Search Location"},
                     {label : "Get Rid"},
                    ];

    // Display Data bindings
    self.chosenDisplayId = ko.observable();
    self.chosenDisplayData = ko.observable();
    self.chosenIndividualData = ko.observable();
    self.chosenIndividualDetails = ko.observable();
    self.makeContact = ko.observable();
    self.getRidData = ko.observable();

    //Behaviours
    self.signIn = function(display) {
      self.showSplashScreen(false);
      self.showSignInSignUpForm(true);
    }

    self.signUp = function(display) {
      self.showSplashScreen(false);
      self.showSignInSignUpForm(true);
    }

    self.handleSignIn = function(formElement) {
      var data = $.param({
          grant_type: 'password',
          username: self.UserName,
          Password: self.Password
        });

      $.ajax({
        type: 'POST',
        url: 'http://getridapi.azurewebsites.net/token',
        data: data
      })
      .done(function(result) {
        console.log("sign in successful.")
        sessionStorage.setItem("getRidLoginToken", result.access_token);
        headers.Authorization = 'Bearer ' + result.access_token;
        self.showSignInSignUpForm(false);
        self.showNavBar(true);
        self.goToDisplay("All");
      })
      .fail(function(result) {
          console.log("sign in failed.", result);
      });
    }

    self.handleGetRid = function(formElement) {
      $.ajax("http://getridapi.azurewebsites.net/api/products", {
            data: ko.toJSON({
              Name: self.Name,
              Description: self.Description,
              Category: self.Category,
              ImageURL: productImage
            }),
            type: "post",
            headers: headers,
            contentType: "application/json"
        })
        .done(function(result) {
          alert('post successful');
          console.log("Add product successful.. ", result);
          self.showSuccessfulGetRid(true);
        })
        .fail(function(result) {
          alert('post failed:' + result);
            console.log("Add Product FAILED", result);
        });
    }

    self.takePhoto = function(formElement) {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality : 100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      });

      function onSuccess(imageData) {
        productImage = imageData;
        //$.post( "/", {data: imageData}, function(data) {
        //  alert("Image uploaded!");
        //});
      }

      function onFail(message) {
          alert('Failed because: ' + message);
      }
    }

    self.handleSignUp = function(formElement) {
        $.ajax("http://getridapi.azurewebsites.net/api/Account/Register", {
            data: ko.toJSON({
              UserName: self.UserName,
              Email: "dummy40@email.com",
              Suburb: "Mt. Vic",
              Password: self.Password,
              ConfirmPassword: self.Password
            }),
            type: "post",
            contentType: "application/json"
        })
        .done(function(result) {
          var data = $.param({
              grant_type: 'password',
              username: self.UserName,
              Password: self.Password
            });
          console.log("REGISTRATION REQUEST DONE: ", data);

          $.ajax({
            type: 'POST',
            url: 'http://getridapi.azurewebsites.net/token',
            data: data
          })
          .done(function(result) {
            console.log("TOKEN REQUEST DONE: ", result);
            //self.username(data.UserName)
            sessionStorage.setItem("getRidLoginToken", result.access_token)
          })
          .fail(function(result) {
            console.log("TOKEN REQUEST FAILED ", result);
          })
        })
        .fail(function(result) {
            console.log("REGISTRATION REQUEST FAILED", result);
        });
    }

    self.handleLogout = function() {
      console.log("logging out..");
      sessionStorage.removeItem("getRidLoginToken");
      self.showSplashScreen(true);
    }

    self.browseNearYou = function(display) {
      self.showSplashScreen(false);
      self.showNavBar(true);
      self.goToDisplay(display);
    }

    self.goToDisplay = function(display) {
      self.chosenDisplayId(display);
      self.chosenIndividualData(null);
      self.chosenIndividualDetails(null);

      $.getJSON('http://getridapi.azurewebsites.net/api/products', function(data) {
          //console.log(data)
          self.itemData(data);
          self.chosenDisplayData(self.itemData());

          // $.getJSON('http://edafinalprojects.blob.core.windows.net/getrid/2015%20June%2008-05:42:28', function(data) {
          //     console.log(data);
          //     self.itemData()[0]["imageAsBase64String"] = data;
          //     console.log(self.itemData()[0]["imageAsBase64String"]);
          // });

          self.goToItem(self.itemData()[0]);
      });

      // onSuccess Callback
      // This method accepts a Position object, which contains the
      // current GPS coordinates
      //
      var onSuccess = function(position) {
          alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
          currentUserPosition = position;
      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    self.trash = function() {
      self.itemData().shift();
       self.goToItem(self.itemData()[0]);
    }

    self.treasure = function() {
      self.goToDetails(self.itemData()[0]);
    }

    self.goToItem = function(item) {
      self.chosenDisplayId(item.display);
      self.chosenDisplayData(null);
      self.chosenIndividualData(item);
    }

    self.goToDetails = function(item) {
      self.chosenIndividualData(null);
      self.chosenIndividualDetails(item);
    }

    self.goToGetRid = function() {
      self.chosenDisplayId(null)
      self.chosenIndividualData(null);
      self.chosenIndividualDetails(null);
      self.chosenDisplayData(null);
      self.getRidData();
      self.showSplashScreen(false);
      self.showGetRidForm(true);
    }

    // self.makeContact = function(){

    // }

    if (token) {
      headers.Authorization = 'Bearer ' + token;
      self.browseNearYou("All");
    }
    else {
      self.showSplashScreen(true);
    }

    // Hammer JS
    imageSwipe = document.getElementById('imageSwipe');
    swipeEvent = new Hammer(imageSwipe);
    swipeEvent.add( new Hammer.Pan({threshold: 100}))

     swipeEvent.on("panleft panright", function(e){
      if (e.type == "panleft") {
        self.trash();
      } else if (e.type == "panright") {
        self.treasure();
      }
    });

  }; //End of appViewModel
  ko.applyBindings(new appViewModel());

}); //End of doc ready
