{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 4,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 34.0, 115.0, 1004.0, 751.0 ],
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 2,
		"style" : "Joshua",
		"subpatcher_template" : "Jay",
		"boxes" : [ 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-1",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "oscFrame.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 30.0, 15.0, 285.0, 270.0 ],
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [  ],
		"originid" : "pat-6",
		"parameters" : 		{
			"obj-1::obj-12" : [ "live.toggle", "live.toggle", 0 ],
			"obj-1::obj-19" : [ "live.gain~", "IN1", 0 ],
			"obj-1::obj-20" : [ "live.gain~[1]", "IN2", 0 ],
			"obj-1::obj-27" : [ "mc.live.gain~", "OUT", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "o.route.mxo",
				"type" : "iLaX"
			}
, 			{
				"name" : "oscFrame.maxpat",
				"bootpath" : "~/Documents/GitHub/j-instrument/controls/libs/oscPresets/max",
				"patcherrelativepath" : "../../controls/libs/oscPresets/max",
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
					"clearcolor" : [ 0.0, 0.0, 0.0, 0.52 ],
					"color" : [ 0.623529411764706, 0.796078431372549, 0.827450980392157, 1.0 ],
					"editing_bgcolor" : [ 0.035294117647059, 0.035294117647059, 0.043137254901961, 1.0 ],
					"fontname" : [ "Fira Code Regular" ],
					"fontsize" : [ 10.0 ],
					"locked_bgcolor" : [ 0.035294117647059, 0.035294117647059, 0.043137254901961, 1.0 ],
					"patchlinecolor" : [ 1.0, 1.0, 1.0, 0.2 ],
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
