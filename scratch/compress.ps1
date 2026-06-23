Add-Type -AssemblyName System.Drawing

$srcPath = "e:\easa college\src\assets\about-main.jpg"
$destPath = "e:\easa college\src\assets\about-main-temp.jpg"

if (Test-Path $srcPath) {
    Write-Host "Loading image..."
    $img = [System.Drawing.Image]::FromFile($srcPath)
    Write-Host "Original dimensions: $($img.Width) x $($img.Height)"
    
    # Target width 1600px
    $targetWidth = 1600
    $ratio = $targetWidth / $img.Width
    $targetHeight = [int]($img.Height * $ratio)
    
    Write-Host "New target dimensions: $targetWidth x $targetHeight"
    
    $newImg = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $g = [System.Drawing.Graphics]::FromImage($newImg)
    
    # Set high quality resize settings
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
    
    # Setup JPEG codec and quality
    $imageCodecInfo = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoder = [System.Drawing.Imaging.Encoder]::Quality
    $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
    # Quality: 85%
    $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, 85)
    
    Write-Host "Saving compressed image to $destPath..."
    $newImg.Save($destPath, $imageCodecInfo, $encoderParameters)
    
    # Clean up
    $g.Dispose()
    $newImg.Dispose()
    $img.Dispose()
    
    # Replace original
    if (Test-Path $destPath) {
        $oldSize = (Get-Item $srcPath).Length
        $newSize = (Get-Item $destPath).Length
        Write-Host "Original size: $([math]::Round($oldSize / 1MB, 2)) MB"
        Write-Host "New size: $([math]::Round($newSize / 1KB, 2)) KB"
        
        Remove-Item $srcPath -Force
        Rename-Item $destPath (Split-Path $srcPath -Leaf)
        Write-Host "Compression completed successfully!"
    } else {
        Write-Error "Failed to create compressed image!"
    }
} else {
    Write-Error "Source image not found!"
}
