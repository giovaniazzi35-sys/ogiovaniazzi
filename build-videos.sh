#!/usr/bin/env bash
# =====================================================================
# Converte os vídeos originais para versões web (H.264 + AAC, faststart)
# e gera as capas .jpg. Os originais NÃO são alterados nem apagados.
#
# Uso:  bash build-videos.sh
# Requer: ffmpeg no PATH
# =====================================================================
set -euo pipefail

FF="${FFMPEG_BIN:-ffmpeg}"
OUT="videos"
mkdir -p "$OUT"

# "arquivo original|nome-de-saida|capa-em-segundos"
# O 3º campo é opcional: se vazio, a capa usa 18% da duração do vídeo.
# Use-o quando esse ponto cair em legenda, transição ou quadro sem conteúdo
# — foi o caso de "vivian" (legenda) e "projeto-004" (transição em branco).
ITEMS=(
  "VD 001 - VIVIAN (STORY).mp4|vivian|3.3"
  "copy_11DE4C0A-B670-4CD0-A9F9-7FA6918C8411.mov|projeto-002|"
  "copy_8B2CD546-721F-4085-80DD-586C186B90D1.mov|projeto-003|"
  "IMG_0903.MP4|projeto-004|1.5"
  "IMG_1256.MOV|projeto-005|"
  "NOVO PAPILON.MOV|papilon|13"
)

for item in "${ITEMS[@]}"; do
  IFS='|' read -r src name posterAt <<< "$item"
  [ -e "$src" ] || { echo "!! não encontrado: $src"; continue; }

  echo ">> $src  ->  $OUT/$name.mp4"
  "$FF" -y -loglevel error -stats -i "$src" \
    -vf "scale=-2:1920:flags=lanczos,fps=30,format=yuv420p" \
    -c:v libx264 -profile:v high -level 4.1 -preset slow -crf 23 \
    -c:a aac -b:a 128k -ac 2 \
    -movflags +faststart \
    "$OUT/$name.mp4"

  # capa: no ponto definido acima, ou a 18% da duração por padrão
  if [ -z "$posterAt" ]; then
    dur=$("${FF%ffmpeg}ffprobe" -v error -show_entries format=duration \
          -of default=noprint_wrappers=1:nokey=1 "$src")
    posterAt=$(awk -v d="$dur" 'BEGIN{printf "%.2f", d*0.18}')
  fi
  "$FF" -y -loglevel error -ss "$posterAt" -i "$src" -frames:v 1 \
    -vf "scale=-2:1280:flags=lanczos" -q:v 4 "$OUT/$name.jpg"
done

# Fundo do hero: sem áudio, mais leve (é só textura atrás do texto)
echo ">> hero.mp4"
"$FF" -y -loglevel error -stats -i "copy_11DE4C0A-B670-4CD0-A9F9-7FA6918C8411.mov" \
  -t 20 -an \
  -vf "scale=-2:1280:flags=lanczos,fps=30,format=yuv420p" \
  -c:v libx264 -profile:v high -preset slow -crf 28 \
  -movflags +faststart \
  "$OUT/hero.mp4"

echo
echo "== resultado =="
ls -l "$OUT" | awk 'NR>1{printf "%7.1f MB  %s\n", $5/1048576, $9}'
