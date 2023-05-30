import { Schema, model, Document } from 'mongoose'

export interface ProductFeaturesFields extends Document {
	productId: Schema.Types.ObjectId
	screen: {
		screenSize: number
		screenResolution: string
		screenTechnology: string
		screenRefreshRate: number
		screenFeatures: string[]
		screenWeakness: string
		screenBodyRatio: number
	}
	battery: {
		batteryCapacity: number
		quickCharge: boolean
		quickChargePower: number
		wirelessCharge: boolean
		chargeSocket: string
		batteryTechnology: string
	}
	camera: {
		dxoMark: number
		cameraCount: number
		mainCamera: {
			mainCameraResolution: number
			mainCameraFeatures: string[]
			diaphragm: number
			videoResolution: string
			videoFPS: number
			videoFeatures: string[]
		}
		otherCameras: [
			{
				otherCameraResolution: number
				otherCameraFeatures: string[]
			}
		]
		frontCamera: {
			frontCameraResolution: number
			frontCameraFeatures: string[]
			diaphragm: number
			videoResolution: string
			videoFPS: number
			videoFeatures: string[]
		}
	}
	basicHardware: {
		chipset: string
		cpuFrequency: number
		cpuCores: number
		cpuArchitecture: string
		gpu: string
		ram: number
		ınternalStorage: number
		otherStorageOptions: number[]
		externalStorage: boolean
		fiveG: boolean
		nfc: boolean
	}
	design: {
		colorOptions: string[]
		material: string
		dimensions: {
			width: number
			height: number
			depth: number
		}
		weight: number
	}
}

const ProductFeaturesSchema = new Schema<ProductFeaturesFields>({})

const ProductFeatures = model<ProductFeaturesFields>(
	'ProductFeatures',
	ProductFeaturesSchema
)

export default ProductFeatures
