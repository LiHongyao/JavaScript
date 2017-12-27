# # 简介

HTML5 \<canvas> 标签用于绘制图像（通过脚本，通常是 JavaScript）。不过，\<canvas> 元素本身并没有绘制能力（它仅仅是图形的容器） - 您必须使用脚本来完成实际的绘图任务。getContext() 方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性。

# # API 

> 提示：API 模块参考 [菜鸟教程](http://www.runoob.com/tags/ref-canvas.html) 

## 2.1、颜色、样式和阴影

| 属性                                       | 描述                    |
| ---------------------------------------- | --------------------- |
| [fillStyle](http://www.runoob.com/tags/canvas-fillstyle.html) | 设置或返回用于填充绘画的颜色、渐变或模式。 |
| [strokeStyle](http://www.runoob.com/tags/canvas-strokestyle.html) | 设置或返回用于笔触的颜色、渐变或模式。   |
| [shadowColor](http://www.runoob.com/tags/canvas-shadowcolor.html) | 设置或返回用于阴影的颜色。         |
| [shadowBlur](http://www.runoob.com/tags/canvas-shadowblur.html) | 设置或返回用于阴影的模糊级别。       |
| [shadowOffsetX](http://www.runoob.com/tags/canvas-shadowoffsetx.html) | 设置或返回阴影与形状的水平距离。      |
| [shadowOffsetY](http://www.runoob.com/tags/canvas-shadowoffsety.html) | 设置或返回阴影与形状的垂直距离。      |

| 方法                                       | 描述                    |
| ---------------------------------------- | --------------------- |
| [createLinearGradient()](http://www.runoob.com/tags/canvas-createlineargradient.html) | 创建线性渐变（用在画布内容上）。      |
| [createPattern()](http://www.runoob.com/tags/canvas-createpattern.html) | 在指定的方向上重复指定的元素。       |
| [createRadialGradient()](http://www.runoob.com/tags/canvas-createradialgradient.html) | 创建放射状/环形的渐变（用在画布内容上）。 |
| [addColorStop()](http://www.runoob.com/tags/canvas-addcolorstop.html) | 规定渐变对象中的颜色和停止位置。      |

## 2.2、线条样式

| [lineCap](http://www.runoob.com/tags/canvas-linecap.html) | 设置或返回线条的结束端点样式。       |
| ---------------------------------------- | --------------------- |
| [lineJoin](http://www.runoob.com/tags/canvas-linejoin.html) | 设置或返回两条线相交时，所创建的拐角类型。 |
| [lineWidth](http://www.runoob.com/tags/canvas-linewidth.html) | 设置或返回当前的线条宽度。         |
| [miterLimit](http://www.runoob.com/tags/canvas-miterlimit.html) | 设置或返回最大斜接长度。          |

## 2.3、矩形

| 方法                                       | 描述              |
| ---------------------------------------- | --------------- |
| [rect()](http://www.runoob.com/tags/canvas-rect.html) | 创建矩形。           |
| [fillRect()](http://www.runoob.com/tags/canvas-fillrect.html) | 绘制"被填充"的矩形。     |
| [strokeRect()](http://www.runoob.com/tags/canvas-strokerect.html) | 绘制矩形（无填充）。      |
| [clearRect()](http://www.runoob.com/tags/canvas-clearrect.html) | 在给定的矩形内清除指定的像素。 |

## 2.4、路径

| 方法                                       | 描述                                 |
| ---------------------------------------- | ---------------------------------- |
| [fill()](http://www.runoob.com/tags/canvas-fill.html) | 填充当前绘图（路径）。                        |
| [stroke()](http://www.runoob.com/tags/canvas-stroke.html) | 绘制已定义的路径。                          |
| [beginPath()](http://www.runoob.com/tags/canvas-beginpath.html) | 起始一条路径，或重置当前路径。                    |
| [moveTo()](http://www.runoob.com/tags/canvas-moveto.html) | 把路径移动到画布中的指定点，不创建线条。               |
| [closePath()](http://www.runoob.com/tags/canvas-closepath.html) | 创建从当前点回到起始点的路径。                    |
| [lineTo()](http://www.runoob.com/tags/canvas-lineto.html) | 添加一个新点，然后在画布中创建从该点到最后指定点的线条。       |
| [clip()](http://www.runoob.com/tags/canvas-clip.html) | 从原始画布剪切任意形状和尺寸的区域。                 |
| [quadraticCurveTo()](http://www.runoob.com/tags/canvas-quadraticcurveto.html) | 创建二次贝塞尔曲线。                         |
| [bezierCurveTo()](http://www.runoob.com/tags/canvas-beziercurveto.html) | 创建三次贝塞尔曲线。                         |
| [arc()](http://www.runoob.com/tags/canvas-arc.html) | 创建弧/曲线（用于创建圆形或部分圆）。                |
| [arcTo()](http://www.runoob.com/tags/canvas-arcto.html) | 创建两切线之间的弧/曲线。                      |
| [isPointInPath()](http://www.runoob.com/tags/canvas-ispointinpath.html) | 如果指定的点位于当前路径中，则返回 true，否则返回 false。 |

## 2.5、转换

| 方法                                       | 描述                             |
| ---------------------------------------- | ------------------------------ |
| [scale()](http://www.runoob.com/tags/canvas-scale.html) | 缩放当前绘图至更大或更小。                  |
| [rotate()](http://www.runoob.com/tags/canvas-rotate.html) | 旋转当前绘图。                        |
| [translate()](http://www.runoob.com/tags/canvas-translate.html) | 重新映射画布上的 (0,0) 位置。             |
| [transform()](http://www.runoob.com/tags/canvas-transform.html) | 替换绘图的当前转换矩阵。                   |
| [setTransform()](http://www.runoob.com/tags/canvas-settransform.html) | 将当前转换重置为单位矩阵。然后运行 transform()。 |

## 2.6、文本

| 属性                                       | 描述                    |
| ---------------------------------------- | --------------------- |
| [font](http://www.runoob.com/tags/canvas-font.html) | 设置或返回文本内容的当前字体属性。     |
| [textAlign](http://www.runoob.com/tags/canvas-textalign.html) | 设置或返回文本内容的当前对齐方式。     |
| [textBaseline](http://www.runoob.com/tags/canvas-textbaseline.html) | 设置或返回在绘制文本时使用的当前文本基线。 |

| 方法                                       | 描述              |
| ---------------------------------------- | --------------- |
| [fillText()](http://www.runoob.com/tags/canvas-filltext.html) | 在画布上绘制"被填充的"文本。 |
| [strokeText()](http://www.runoob.com/tags/canvas-stroketext.html) | 在画布上绘制文本（无填充）。  |
| [measureText()](http://www.runoob.com/tags/canvas-measuretext.html) | 返回包含指定文本宽度的对象。  |

## 2.7、图像绘制

| 方法                                       | 描述              |
| ---------------------------------------- | --------------- |
| [drawImage()](http://www.runoob.com/tags/canvas-drawimage.html) | 向画布上绘制图像、画布或视频。 |

## 2.8、像素操作

| 属性                                       | 描述                               |
| ---------------------------------------- | -------------------------------- |
| [width](http://www.runoob.com/tags/canvas-imagedata-width.html) | 返回 ImageData 对象的宽度。              |
| [height](http://www.runoob.com/tags/canvas-imagedata-height.html) | 返回 ImageData 对象的高度。              |
| [data](http://www.runoob.com/tags/canvas-imagedata-data.html) | 返回一个对象，其包含指定的 ImageData 对象的图像数据。 |

| 方法                                       | 描述                                  |
| ---------------------------------------- | ----------------------------------- |
| [createImageData()](http://www.runoob.com/tags/canvas-createimagedata.html) | 创建新的、空白的 ImageData 对象。              |
| [getImageData()](http://www.runoob.com/tags/canvas-getimagedata.html) | 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。 |
| [putImageData()](http://www.runoob.com/tags/canvas-putimagedata.html) | 把图像数据（从指定的 ImageData 对象）放回画布上。      |

## 2.9、合成

| 属性                                       | 描述                     |
| ---------------------------------------- | ---------------------- |
| [globalAlpha](http://www.runoob.com/tags/canvas-globalalpha.html) | 设置或返回绘图的当前 alpha 或透明值。 |
| [globalCompositeOperation](http://www.runoob.com/tags/canvas-globalcompositeoperation.html) | 设置或返回新图像如何绘制到已有的图像上。   |

## 2.10、其他

| 方法            | 描述               |
| ------------- | ---------------- |
| save()        | 保存当前环境的状态。       |
| restore()     | 返回之前保存过的路径状态和属性。 |
| createEvent() |                  |
| getContext()  |                  |
| toDataURL()   |                  |