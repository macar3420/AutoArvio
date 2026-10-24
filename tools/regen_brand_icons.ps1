# Regenerate AutoArvio splash/launcher from shared-A wordmark PNG.
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\musta\AppData\Local\Cursor\AgentStores\cursor_agent_stores\bc-291574c2-926b-43bb-a99f-2497b288c9a3\files\media\brand\autoarvio-logo-shared-a.png"
$res = Join-Path $PSScriptRoot "..\app\src\main\res" | Resolve-Path
$ultramarine = [System.Drawing.Color]::FromArgb(255, 4, 55, 242)

function Test-IsBg([System.Drawing.Color]$c) {
    # Ultramarine + near-ultramarine anti-alias fringe
    $dr = [Math]::Abs([int]$c.R - 4)
    $dg = [Math]::Abs([int]$c.G - 55)
    $db = [Math]::Abs([int]$c.B - 242)
    return ($dr + $dg + $db) -lt 90
}

function Get-MarkBitmap([string]$path) {
    $src = [System.Drawing.Bitmap]::FromFile($path)
    $w = $src.Width
    $h = $src.Height
    $mark = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $minX = $w; $minY = $h; $maxX = -1; $maxY = -1
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $c = $src.GetPixel($x, $y)
            if (Test-IsBg $c) {
                $mark.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            } else {
                # Keep letter color (off-white), full alpha
                $mark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
                if ($x -lt $minX) { $minX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    $src.Dispose()
    if ($maxX -lt 0) { throw "No mark pixels found in source logo" }
    $cw = $maxX - $minX + 1
    $ch = $maxY - $minY + 1
    $cropped = New-Object System.Drawing.Bitmap $cw, $ch, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($mark, 0, 0, (New-Object System.Drawing.Rectangle $minX, $minY, $cw, $ch), [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $mark.Dispose()
    return @{ Bitmap = $cropped; Width = $cw; Height = $ch }
}

function New-PaddedForeground([System.Drawing.Bitmap]$mark, [int]$canvas, [double]$fillRatio) {
    # fillRatio = fraction of canvas used by the longer mark side (safe zone ~0.66)
    $out = New-Object System.Drawing.Bitmap $canvas, $canvas, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($out)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $maxSide = [Math]::Max($mark.Width, $mark.Height)
    $target = [int]([Math]::Floor($canvas * $fillRatio))
    $scale = $target / $maxSide
    $dw = [int]([Math]::Round($mark.Width * $scale))
    $dh = [int]([Math]::Round($mark.Height * $scale))
    $dx = [int](($canvas - $dw) / 2)
    $dy = [int](($canvas - $dh) / 2)
    $g.DrawImage($mark, $dx, $dy, $dw, $dh)
    $g.Dispose()
    return $out
}

function Save-Png([System.Drawing.Bitmap]$bmp, [string]$path) {
    $dir = Split-Path $path -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

function New-FlatIcon([System.Drawing.Bitmap]$fg, [int]$size) {
    $out = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($out)
    $g.Clear($ultramarine)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($fg, 0, 0, $size, $size)
    $g.Dispose()
    return $out
}

Write-Host "Extracting mark from $srcPath"
$info = Get-MarkBitmap $srcPath
$mark = $info.Bitmap
Write-Host ("Cropped mark {0}x{1}" -f $info.Width, $info.Height)

# Adaptive foreground: 1080px master (10x 108dp). Dense shared-A wordmark —
# 56% keeps A+UTO/RVIO readable while staying inside ~66% adaptive safe zone.
$fill = 0.56
$fgMaster = New-PaddedForeground $mark 1080 $fill
$fgPath = Join-Path $res "drawable-nodpi\ic_launcher_foreground.png"
Save-Png $fgMaster $fgPath
Write-Host "Wrote $fgPath"

# Full logo asset for any future Compose use (full-bleed ultramarine plate)
$logoFull = New-Object System.Drawing.Bitmap 500, 500, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$lg = [System.Drawing.Graphics]::FromImage($logoFull)
$lg.Clear($ultramarine)
$lg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$pad = New-PaddedForeground $mark 500 0.72
$lg.DrawImage($pad, 0, 0, 500, 500)
$lg.Dispose()
$pad.Dispose()
$logoPath = Join-Path $res "drawable-nodpi\autoarvio_logo.png"
Save-Png $logoFull $logoPath
$logoFull.Dispose()
Write-Host "Wrote $logoPath"

# Also keep a project brand copy
$brandDir = Join-Path $PSScriptRoot "..\brand" | Resolve-Path -ErrorAction SilentlyContinue
if (-not $brandDir) {
    New-Item -ItemType Directory -Path (Join-Path $PSScriptRoot "..\brand") | Out-Null
    $brandDir = Join-Path $PSScriptRoot "..\brand" | Resolve-Path
}
Copy-Item $srcPath (Join-Path $brandDir "autoarvio-logo-shared-a.png") -Force

$densities = @{
    "mipmap-mdpi"    = 48
    "mipmap-hdpi"    = 72
    "mipmap-xhdpi"   = 96
    "mipmap-xxhdpi"  = 144
    "mipmap-xxxhdpi" = 192
}

foreach ($name in $densities.Keys) {
    $size = $densities[$name]
    $flat = New-FlatIcon $fgMaster $size
    $dir = Join-Path $res $name
    Save-Png $flat (Join-Path $dir "ic_launcher.png")
    Save-Png $flat (Join-Path $dir "ic_launcher_round.png")
    $flat.Dispose()
    Write-Host "Wrote $name @ ${size}px"
}

$fgMaster.Dispose()
$mark.Dispose()
Write-Host "Done fillRatio=$fill"
