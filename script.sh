#!/bin/bash

directories=(
  "000_def_f65b1"
  "003_hws_9bde9"
  "004_bir_a2e60"
  "005_win_57061"
  "006_val_d85a0"
  "007_sfp_273a8"
  "008_com_e529a"
  "009_qas_93707"
  "010_acp_6ffcb"
  "011_alc_c1d1c"
  "012_tcg_d977a"
  "013_tow_4b54b"
  "014_yel_d187b"
  "015_red_062bf"
  "016_blu_e56fc"
  "017_grn_f0c1a"
  "018_prpl_f65b1"
  "019_sloth1_7f914"
  "020_ppl_3c22d"
  "021_cpa_5ce03"
  "022_lqc_d2d1a"
  "023_dyd_c470b"
  "024_aota_3db1f"
  "025_tfr_5ce03"
  "026_fon_f2c70"
  "027_tkg_69097"
  "028_kri_306cb"
  "029_awk_15364"
  "030_brt_19821"
  "031_skr_8944c"
  "032_ord_635af"
  "033_swy_82090"
  "034_tvg_yg724"
  "035_tmo_we6g3"
  "036_ddc_je4z0"
  "037_hmh_f7k8s"
)

events=(
  "battle_accept"
  "battle_challenge"
  "direct_transfer"
  "friend_accept"
  "friend_request"
  "item"
  "neomail"
  "trade_accept"
  "trade_offer"
  "trade_reject"
  "trade_withdraw"
  "warning"
)

declare -A subs=(
  ["friend_accept"]="friend_request"
  ["trade_accept"]="trade_offer"
  ["trade_withdraw"]="trade_reject"
)

ext="chrome-extension://__MSG_@@extension_id__"
base="http://images.neopets.com/themes/"
counter=0

rotations=$(pwd)/data/rotations.json
echo "{" > $rotations

backgrounds=(
  banner_bg.png
  header_bg.png
  footer_bg.png
)

navigation=(
  myaccount
  customise
  games
  explore
  news
  community
  shops
  ncmall
  premium
  privacypolicy
  divider
  safetytips
  contactus
  aboutus
  referral
  help
  ad-choices
  follow-us-on
)

cd img/themes/
rm -rf 0*

for d in ${directories[@]}
do
  mkdir $d
  cd $d

  let counter=counter+1
  echo "($counter) Downloading images for $d..."

  mkdir events
  cd events

  for e in ${events[@]}
  do
    url=$base$d/events/$e.png
    if wget --spider -q $url
    then
      wget -q $url
    else
      if [ $e == "direct_transfer" ]
      then
        wget -q $base${directories[0]}/events/$e.png
      else
        wget -q -O $e.png $base$d/events/${subs[$e]}.png
      fi
    fi
  done

  cd ..

  mkdir rotations
  cd rotations

  rotation=1
  url=$base$d/rotations/

  while wget --spider -q $url$rotation.png
  do
    wget -q $url$rotation.png
    let rotation=rotation+1
  done

  let rotation=rotation-1
  echo "  \"$d\": $rotation," >> $rotations

  cd ..

  mkdir backgrounds
  cd backgrounds

  for b in ${backgrounds[@]}
  do
    wget -q $base$d/$b
  done

  cd ..

  mkdir navigation
  cd navigation

  for nav in ${navigation[@]}
  do
    url=$base$d/navigation/$nav.png
    if wget --spider -q $url
    then
      wget -q $url
    else
      echo "$url not found"
    fi
  done

  cd ..

  cd ..
done

echo "}" >> $rotations
tac $rotations | sed '/,/ {s///; :loop; n; b loop}' | tac > temp
mv temp $rotations

cd ../../..

cd css/themes
rm -rf 0*

for d in ${directories[@]}
do
  let counter=counter+1
  echo "($counter) Downloading css for $d..."
  wget -q "http://images.neopets.com/css/themes/"$d.css

  for b in ${backgrounds[@]}
  do
    sed "s,$base$d/$b,$ext/img/themes/$d/backgrounds/$b," $d.css > temp
    mv temp $d.css
  done
done

cd ../../..
