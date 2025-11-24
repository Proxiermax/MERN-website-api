import { type Request, type Response } from "express";
import {
    listVariantOptions,
    getVariantOption,
    createVariantOption,
    updateVariantOption,
    removeVariantOption
} from "../services/variantOption.service.js";

export const getVariantOptionsHandler = async (req: Request, res: Response) => {
    try {
        const variantId = (req.query.variantId as string) || undefined;
        const items = await listVariantOptions(variantId);
        res.status(200).json(items);
    } catch (err) {
        console.error("getVariantOptionsHandler:", err);
        res.status(500).json({ error: "Failed to fetch variant options" });
    }
};

export const getVariantOptionByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "ID parameter is required" });
        const item = await getVariantOption(id);
        if (!item) return res.status(404).json({ error: "Variant option not found" });
        res.status(200).json(item);
    } catch (err) {
        console.error("getVariantOptionByIdHandler:", err);
        res.status(500).json({ error: "Failed to fetch variant option" });
    }
};

export const createVariantOptionHandler = async (req: Request, res: Response) => {
    try {
        const { variant_id, value } = req.body ?? {};
        if (!variant_id || !value) return res.status(400).json({ error: "variant_id and value are required" });
        const item = await createVariantOption({ variant_id, value });
        res.status(201).json(item);
    } catch (err: any) {
        if (err?.message === "Variant not found") return res.status(400).json({ error: err.message });
        console.error("createVariantOptionHandler:", err);
        res.status(500).json({ error: "Failed to create variant option" });
    }
};

export const updateVariantOptionHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "ID parameter is required" });
        const item = await updateVariantOption(id, req.body ?? {});
        if (!item) return res.status(404).json({ error: "Variant option not found" });
        res.status(200).json(item);
    } catch (err: any) {
        if (err?.message === "Variant not found") return res.status(400).json({ error: err.message });
        console.error("updateVariantOptionHandler:", err);
        res.status(500).json({ error: "Failed to update variant option" });
    }
};

export const deleteVariantOptionHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({ error: "ID parameter is required" });
        const ok = await removeVariantOption(id);
        if (!ok) return res.status(404).json({ error: "Variant option not found" });
        res.status(204).send();
    } catch (err) {
        console.error("deleteVariantOptionHandler:", err);
        res.status(500).json({ error: "Failed to delete variant option" });
    }
};