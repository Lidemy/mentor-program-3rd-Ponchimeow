#!/bin/bash
# Program:
# Enter an username, show this GitHub's Nick name,
# History:
# 2019/04/21 Ponchimeow week1 super challenge
echo "輸出: "
curl -s https://github.com/$1 | grep -oP '(?<=<span class="p-name vcard-fullname d-block overflow-hidden" itemprop="name">)[^<]*|(?<=<div class="p-note user-profile-bio js-user-profile-bio mb-3"><div>)[^<]*|(?<=<span class="p-label">)[^<]*|(?<=<a rel="nofollow me" href="https://medium.com/@hulitw">)[^<]*'
# curl -s   --silent                Silent mode，Don't output anything.
# grep -o   --only-matching         show only the part of a line matching PATTERN
# grep -P   --perl-regexp           PATTERN is a Perl regular expression
# 	正則比對，可想成他是從左到右按照規則去比對，像是 abcd5fg，而你的規則是要取到數字，那他就會列出 abcd5，看到5然後停止
#	(?<=Y)X  Positive lookbehind，要找 X，前方(左側)必須為 Y
#	(?<!Y)X  Negative lookbehind，要找 X，前方(左側)不可為 Y
#	. 為字元
#	[^...]*   比對中括號中除了...之外的字元，而* 則表示比對一次以上，
#	假如一個字串為 <tag>test</tag>
#	(?<=<tag>)[^<]* 
#	先將左側()視為(?<=<tag>).*，表示要找尋的字串左側必須為 <tag>，然後找所有字元，此時找出的字串為 test</tag>
#	讓我們再換成[^<]，就能想成對 test</tag> 一個一個字元做比對，比對至 < 的時候就印出字串，捨去剩下的，此時取出的字串即為 test