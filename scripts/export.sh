#!/bin/bash
#export feedbacks PLEASE CHANGE TO YOUR PATH
/usr/local/bin/mongoexport --db dogfooding --collection feedbacks --csv -f date_added,comment,application,imei,build_id,contact,associated_bug,severity,type_info,additional_info --out /users/mariopl/Repositorios/firefoxos-dogfood/public/prefeedback.csv
#change separator PLEASE CHANGE TO YOUR PATH
sed -e 's/,/;/g' /Users/mariopl/Repositorios/firefoxos-dogfood/public/prefeedback.csv > /Users/mariopl/Repositorios/firefoxos-dogfood/public/feedback.csv