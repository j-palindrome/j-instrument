{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 3,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 34.0, 143.0, 720.0, 576.0 ],
		"default_fontsize" : 10.0,
		"default_fontname" : "Fira Code Regular",
		"gridsize" : [ 15.0, 45.0 ],
		"gridsnaponopen" : 2,
		"style" : "Joshua",
		"subpatcher_template" : "Joshua",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 7,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 435.0, 180.0, 113.0, 21.0 ],
					"text" : "abl.dsp.darkhall~",
					"varname" : "reverb[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "multichannelsignal" ],
					"patching_rect" : [ 435.0, 225.0, 70.0, 21.0 ],
					"text" : "mc.pack~ 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 480.0, 90.0, 45.0, 21.0 ],
					"text" : "*~ 0.8"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 480.0, 45.0, 45.0, 21.0 ],
					"text" : "r~ IN1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "preset", "int", "preset", "int", "" ],
					"patching_rect" : [ 165.0, 45.0, 100.0, 40.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 7,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 285.0, 180.0, 113.0, 21.0 ],
					"text" : "abl.dsp.darkhall~",
					"varname" : "reverb"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 285.0, 225.0, 107.0, 21.0 ],
					"text" : "abl.device.roar~",
					"varname" : "roar"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "multichannelsignal" ],
					"patching_rect" : [ 285.0, 270.0, 70.0, 21.0 ],
					"text" : "mc.pack~ 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 360.0, 405.0, 64.0, 21.0 ],
					"text" : "mc.s~ OUT"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 285.0, 45.0, 45.0, 21.0 ],
					"text" : "r~ IN2"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 1 ],
					"order" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"order" : 1,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 1 ],
					"source" : [ "obj-12", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 1 ],
					"source" : [ "obj-14", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 1 ],
					"order" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"order" : 1,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 1 ],
					"source" : [ "obj-7", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
 ],
		"originid" : "pat-18",
		"dependency_cache" : [  ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "Joshua",
				"default" : 				{
					"bgcolor" : [ 0.215686274509804, 0.215686274509804, 0.250980392156863, 1.0 ],
					"bgfillcolor" : 					{
						"angle" : 270.0,
						"color" : [ 0.2, 0.2, 0.2, 1.0 ],
						"color1" : [ 0.376470588235294, 0.384313725490196, 0.4, 1.0 ],
						"color2" : [ 0.290196078431373, 0.309803921568627, 0.301960784313725, 1.0 ],
						"proportion" : 0.39,
						"type" : "color"
					}
,
					"color" : [ 0.623529411764706, 0.796078431372549, 0.827450980392157, 1.0 ],
					"editing_bgcolor" : [ 0.098039215686275, 0.098039215686275, 0.117647058823529, 1.0 ],
					"fontname" : [ "Fira Code Regular" ],
					"fontsize" : [ 10.0 ],
					"locked_bgcolor" : [ 0.098039215686275, 0.098039215686275, 0.117647058823529, 1.0 ],
					"patchlinecolor" : [ 1.0, 1.0, 1.0, 0.5 ],
					"selectioncolor" : [ 0.925490196078431, 0.847058823529412, 0.16078431372549, 1.0 ],
					"stripecolor" : [ 0.243137254901961, 0.474509803921569, 0.701960784313725, 1.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"textcolor_inverse" : [ 0.968627, 0.968627, 0.968627, 1.0 ],
					"textjustification" : [ 0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
