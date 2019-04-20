#!/bin/bash
# Program:
#	Enter a number, and make 1 ~ n file, file name is ${number}.js
# History:
#	2019/04/20	Ponchimeow	week1 challenge
read -p "請輸入欲創建的js檔案數量: " num
echo "輸入的數量為 ${num}"
for ((i=1;i<=${num};i++))
do
	touch ${i}.js
done
echo "檔案建立完畢，已建立 ${num}個檔案"
