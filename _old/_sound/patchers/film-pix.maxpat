{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 6,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 385.0, 115.0, 854.0, 651.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 10.0,
		"default_fontface" : 0,
		"default_fontname" : "Fira Code Regular",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "Joshua",
		"subpatcher_template" : "Joshua",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"annotation" : "## An LFO-based VIZZIE data generator ##",
					"bgmode" : 1,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-27",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "vz.oscil8r.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "" ],
					"patching_rect" : [ 60.0, 315.0, 200.0, 146.0 ],
					"prototypename" : "pixl",
					"varname" : "oscil8r",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-24",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.LFO.maxpat",
					"numinlets" : 0,
					"numoutlets" : 5,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal", "signal", "signal", "signal" ],
					"patching_rect" : [ 735.0, 60.0, 137.0, 116.0 ],
					"varname" : "bp.LFO",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"annotation" : "## Generate random VIZZIE data ##",
					"bgmode" : 1,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-5",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "vz.randomizr.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "" ],
					"patching_rect" : [ 450.0, 45.0, 148.0, 112.0 ],
					"prototypename" : "pixl",
					"varname" : "randomizr",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "jit.pwindow",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 420.0, 466.0, 80.0, 60.0 ],
					"sync" : 1
				}

			}
, 			{
				"box" : 				{
					"annotation" : "## A Basis Function-based video generator ##",
					"bgmode" : 1,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-20",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "vz.bfgener8r.maxpat",
					"numinlets" : 12,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "jit_gl_texture" ],
					"patching_rect" : [ 420.0, 211.0, 268.0, 234.0 ],
					"prototypename" : "pixl",
					"varname" : "bfgener8r",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "jit.pwindow",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 105.0, 631.0, 80.0, 60.0 ],
					"sync" : 1
				}

			}
, 			{
				"box" : 				{
					"annotation" : "## Rotate/offset a video ##",
					"bgmode" : 1,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-18",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "vz.rotatr.maxpat",
					"numinlets" : 5,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "jit_gl_texture" ],
					"patching_rect" : [ 60.0, 480.0, 248.0, 130.0 ],
					"prototypename" : "pixl",
					"varname" : "rotatr",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 60.0, 136.0, 45.0, 21.0 ],
					"text" : "update"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 60.0, 106.0, 58.0, 21.0 ],
					"text" : "r RENDER"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 60.0, 196.0, 88.0, 21.0 ],
					"text" : "time $1, bang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 60.0, 166.0, 58.0, 21.0 ],
					"text" : "jit.time"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_gl_texture", "" ],
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 6,
							"revision" : 2,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "jit.gen",
						"rect" : [ 385.0, 115.0, 469.0, 651.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 10.0,
						"default_fontface" : 0,
						"default_fontname" : "Fira Code Regular",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "Joshua",
						"subpatcher_template" : "Joshua",
						"assistshowspatchername" : 0,
						"boxes" : [ 							{
								"box" : 								{
									"id" : "obj-7",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 105.0, 15.0, 82.0, 21.0 ],
									"text" : "param time 0"
								}

							}
, 							{
								"box" : 								{
									"code" : "out1 = vec(mod(time, 1.), 0, 0, 0);\r\n",
									"fontface" : 0,
									"fontname" : "<Monospaced>",
									"fontsize" : 10.0,
									"id" : "obj-5",
									"maxclass" : "codebox",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 75.0, 585.0, 405.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-1",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 15.0, 33.0, 21.0 ],
									"text" : "in 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-4",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 540.0, 39.0, 21.0 ],
									"text" : "out 1"
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-5", 0 ],
									"source" : [ "obj-1", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-4", 0 ],
									"source" : [ "obj-5", 0 ]
								}

							}
 ],
						"styles" : [ 							{
								"name" : "Joshua",
								"default" : 								{
									"bgcolor" : [ 0.215686274509804, 0.215686274509804, 0.250980392156863, 1.0 ],
									"bgfillcolor" : 									{
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
,
					"patching_rect" : [ 60.0, 286.0, 267.0, 21.0 ],
					"text" : "jit.gl.pix WORLD @dim 1080 1080 @type char"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 60.0, 751.0, 119.0, 21.0 ],
					"text" : "jit.gl.layer WORLD"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"order" : 1,
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"order" : 0,
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"order" : 1,
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"order" : 0,
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 1 ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 2 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-18::obj-19" : [ "range[4]", "range", 0 ],
			"obj-18::obj-26" : [ "pictctrl[60]", "pictctrl[1]", 0 ],
			"obj-18::obj-28" : [ "pictctrl[57]", "pictctrl[1]", 0 ],
			"obj-18::obj-48" : [ "Rotation", "Rotation", 0 ],
			"obj-18::obj-51" : [ "Mode", "Mode", 0 ],
			"obj-18::obj-56::obj-23" : [ "gswitch2[2]", "gswitch2", 0 ],
			"obj-18::obj-74" : [ "pictctrl[58]", "pictctrl[1]", 0 ],
			"obj-18::obj-75" : [ "pictctrl[59]", "pictctrl[1]", 0 ],
			"obj-18::obj-77" : [ "Y offset", "Y offset", 0 ],
			"obj-18::obj-78" : [ "X offset", "X offset", 0 ],
			"obj-20::obj-100" : [ "Speed", "Speed", 1 ],
			"obj-20::obj-104" : [ "pictctrl[148]", "pictctrl[1]", 0 ],
			"obj-20::obj-15" : [ "pictctrl[34]", "pictctrl[1]", 0 ],
			"obj-20::obj-17" : [ "pictctrl[31]", "pictctrl[1]", 0 ],
			"obj-20::obj-21" : [ "Colorize", "Colorize", 0 ],
			"obj-20::obj-23" : [ "pictctrl[33]", "pictctrl[1]", 0 ],
			"obj-20::obj-26" : [ "pictctrl[32]", "pictctrl[1]", 0 ],
			"obj-20::obj-278" : [ "textbutton[3]", "textbutton[1]", 0 ],
			"obj-20::obj-37" : [ "pictctrl[28]", "pictctrl[1]", 0 ],
			"obj-20::obj-46" : [ "pictctrl[27]", "pictctrl[1]", 0 ],
			"obj-20::obj-5" : [ "Function", "Function", 0 ],
			"obj-20::obj-55" : [ "Bcolorize", "Bcolorize", 0 ],
			"obj-20::obj-56" : [ "Gcolorize", "Gcolorize", 0 ],
			"obj-20::obj-57" : [ "Rcolorize", "Rcolorize", 0 ],
			"obj-20::obj-59" : [ "pictctrl[106]", "pictctrl[1]", 0 ],
			"obj-20::obj-61" : [ "Zoom hi", "Zoom", 1 ],
			"obj-20::obj-63" : [ "Zoom range[2]", "Zoom range", 1 ],
			"obj-20::obj-76" : [ "pictctrl[29]", "pictctrl[1]", 0 ],
			"obj-20::obj-78" : [ "Zoom lo", "Zoom", 1 ],
			"obj-20::obj-8" : [ "pictctrl[30]", "pictctrl[1]", 0 ],
			"obj-20::obj-85" : [ "pictctrl[4]", "pictctrl[1]", 0 ],
			"obj-20::obj-91::obj-10::obj-11" : [ "Jitter[2]", "Jitter", 0 ],
			"obj-20::obj-91::obj-10::obj-19" : [ "Amount", "Amount", 0 ],
			"obj-20::obj-91::obj-11::obj-11" : [ "Jitter[1]", "Jitter", 0 ],
			"obj-20::obj-91::obj-11::obj-18" : [ "Smoothing", "Smoothing", 0 ],
			"obj-20::obj-91::obj-12::obj-23" : [ "Gain[3]", "Gain", 0 ],
			"obj-20::obj-91::obj-12::obj-25" : [ "Offset[3]", "Offset", 0 ],
			"obj-20::obj-91::obj-12::obj-27" : [ "Lacunarity[3]", "Lacunarity", 0 ],
			"obj-20::obj-91::obj-12::obj-31" : [ "H value[3]", "H value", 0 ],
			"obj-20::obj-91::obj-13::obj-11" : [ "Jitter", "Jitter", 0 ],
			"obj-20::obj-91::obj-15::obj-11" : [ "H value[4]", "H value", 0 ],
			"obj-20::obj-91::obj-15::obj-16" : [ "Lacunarity[4]", "Lacunarity", 0 ],
			"obj-20::obj-91::obj-15::obj-18" : [ "Offset[4]", "Offset", 0 ],
			"obj-20::obj-91::obj-15::obj-19" : [ "Gain[4]", "Gain", 0 ],
			"obj-20::obj-91::obj-1::obj-24" : [ "Gain", "Gain", 0 ],
			"obj-20::obj-91::obj-1::obj-26" : [ "Offset", "Offset", 0 ],
			"obj-20::obj-91::obj-1::obj-28" : [ "Lacunarity", "Lacunarity", 0 ],
			"obj-20::obj-91::obj-1::obj-32" : [ "H value", "H value", 0 ],
			"obj-20::obj-91::obj-3::obj-11" : [ "Distortion", "Distortion", 0 ],
			"obj-20::obj-91::obj-4::obj-24" : [ "Gain[1]", "Gain", 0 ],
			"obj-20::obj-91::obj-4::obj-26" : [ "Offset[1]", "Offset", 0 ],
			"obj-20::obj-91::obj-4::obj-28" : [ "Lacunarity[1]", "Lacunarity", 0 ],
			"obj-20::obj-91::obj-4::obj-32" : [ "H value[1]", "H value", 0 ],
			"obj-20::obj-91::obj-5::obj-23" : [ "Gain[2]", "Gain", 0 ],
			"obj-20::obj-91::obj-5::obj-25" : [ "Offset[2]", "Offset", 0 ],
			"obj-20::obj-91::obj-5::obj-27" : [ "Lacunarity[2]", "Lacunarity", 0 ],
			"obj-20::obj-91::obj-5::obj-31" : [ "H value[2]", "H value", 0 ],
			"obj-20::obj-91::obj-6::obj-11" : [ "Jitter[4]", "Jitter", 0 ],
			"obj-20::obj-91::obj-6::obj-24" : [ "X crackle", "X crackle", 0 ],
			"obj-20::obj-91::obj-6::obj-28" : [ "Y crackle", "Y crackle", 0 ],
			"obj-20::obj-91::obj-6::obj-29" : [ "Z crackle", "Z crackle", 0 ],
			"obj-20::obj-91::obj-9::obj-11" : [ "Jitter[3]", "Jitter", 0 ],
			"obj-20::obj-91::obj-9::obj-16" : [ "Shading", "Shading", 0 ],
			"obj-20::obj-96" : [ "pictctrl[35]", "pictctrl[1]", 0 ],
			"obj-24::obj-12" : [ "Mute", "Mute", 0 ],
			"obj-24::obj-20" : [ "Frequency", "Freq", 0 ],
			"obj-27::obj-10" : [ "Frequency[1]", "Frequency", 0 ],
			"obj-27::obj-109" : [ "pictctrl[105]", "pictctrl[3]", 0 ],
			"obj-27::obj-113" : [ "pictctrl[104]", "pictctrl[3]", 0 ],
			"obj-27::obj-12" : [ "Waveform", "Waveform", 0 ],
			"obj-27::obj-13" : [ "phase[13]", "Phase", 0 ],
			"obj-27::obj-265" : [ "pictctrl[91]", "pictctrl[3]", 0 ],
			"obj-27::obj-278" : [ "textbutton[2]", "textbutton[1]", 1 ],
			"obj-27::obj-49" : [ "pictctrl[89]", "pictctrl[1]", 0 ],
			"obj-27::obj-91" : [ "pictctrl[85]", "pictctrl[3]", 0 ],
			"obj-27::obj-96" : [ "Multiply", "Multiply", 0 ],
			"obj-5::obj-44" : [ "textbutton[23]", "textbutton[1]", 0 ],
			"obj-5::obj-49" : [ "pictctrl[369]", "pictctrl[1]", 0 ],
			"obj-5::obj-50" : [ "pictctrl[368]", "pictctrl[1]", 0 ],
			"obj-5::obj-53" : [ "pictctrl[364]", "pictctrl[1]", 0 ],
			"obj-5::obj-65" : [ "Rate", "Rate", 0 ],
			"parameterbanks" : 			{

			}
,
			"parameter_overrides" : 			{
				"obj-20::obj-91::obj-10::obj-11" : 				{
					"parameter_longname" : "Jitter[2]"
				}
,
				"obj-20::obj-91::obj-11::obj-11" : 				{
					"parameter_longname" : "Jitter[1]"
				}
,
				"obj-20::obj-91::obj-12::obj-23" : 				{
					"parameter_longname" : "Gain[3]"
				}
,
				"obj-20::obj-91::obj-12::obj-25" : 				{
					"parameter_longname" : "Offset[3]"
				}
,
				"obj-20::obj-91::obj-12::obj-27" : 				{
					"parameter_longname" : "Lacunarity[3]"
				}
,
				"obj-20::obj-91::obj-12::obj-31" : 				{
					"parameter_longname" : "H value[3]"
				}
,
				"obj-20::obj-91::obj-15::obj-11" : 				{
					"parameter_longname" : "H value[4]"
				}
,
				"obj-20::obj-91::obj-15::obj-16" : 				{
					"parameter_longname" : "Lacunarity[4]"
				}
,
				"obj-20::obj-91::obj-15::obj-18" : 				{
					"parameter_longname" : "Offset[4]"
				}
,
				"obj-20::obj-91::obj-15::obj-19" : 				{
					"parameter_longname" : "Gain[4]"
				}
,
				"obj-20::obj-91::obj-4::obj-24" : 				{
					"parameter_longname" : "Gain[1]"
				}
,
				"obj-20::obj-91::obj-4::obj-26" : 				{
					"parameter_longname" : "Offset[1]"
				}
,
				"obj-20::obj-91::obj-4::obj-28" : 				{
					"parameter_longname" : "Lacunarity[1]"
				}
,
				"obj-20::obj-91::obj-4::obj-32" : 				{
					"parameter_longname" : "H value[1]"
				}
,
				"obj-20::obj-91::obj-5::obj-23" : 				{
					"parameter_longname" : "Gain[2]"
				}
,
				"obj-20::obj-91::obj-5::obj-25" : 				{
					"parameter_longname" : "Offset[2]"
				}
,
				"obj-20::obj-91::obj-5::obj-27" : 				{
					"parameter_longname" : "Lacunarity[2]"
				}
,
				"obj-20::obj-91::obj-5::obj-31" : 				{
					"parameter_longname" : "H value[2]"
				}
,
				"obj-20::obj-91::obj-6::obj-11" : 				{
					"parameter_longname" : "Jitter[4]"
				}
,
				"obj-20::obj-91::obj-9::obj-11" : 				{
					"parameter_longname" : "Jitter[3]"
				}
,
				"obj-27::obj-10" : 				{
					"parameter_longname" : "Frequency[1]"
				}
,
				"obj-27::obj-91" : 				{
					"parameter_longname" : "pictctrl[85]"
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "bfgenerator_UI.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.LFO.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/LFO",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "data-handler-L.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "data-handler.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "distorted_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "exact_menu.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "fractal_fbm_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "fractal_hetero_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "fractal_hybrid_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "fractal_multi_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "fractal_rigid_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "gen-LFO.gendsp",
				"bootpath" : "C74:/packages/Vizzie/patchers/gen",
				"type" : "gDSP",
				"implicit" : 1
			}
, 			{
				"name" : "jit.mo.time.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "lo_hi_UI_control.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "noise_voronoi_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "noise_voronoi_crackle_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "noise_voronoi_id_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "noise_voronoi_smooth_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "noise_voronoise_controls.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/bfg",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "video-handler.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "vizzie-datatexconvert.js",
				"bootpath" : "C74:/packages/Vizzie/code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "vizzie-global.js",
				"bootpath" : "C74:/packages/Vizzie/code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "vz.bfgener8r.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "vz.oscil8r.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "vz.randomizr.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "vz.rotatr.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "vzgl-blackframe.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "vzgl-object.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "vzgl-outputdim.maxpat",
				"bootpath" : "C74:/packages/Vizzie/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
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
