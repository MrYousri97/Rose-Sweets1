"use client";

import { useCallback, useEffect, useState } from "react";
import {
  initialMenu,
  loadMenu,
  saveMenu,
  resetMenu,
  genId,
  type MenuData,
  type MenuItem,
  type MenuCategory,
} from "@/lib/menu-data";
import { MenuPreview } from "@/components/menu-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Trash2,
  Printer,
  RotateCcw,
  Pencil,
  Check,
  X,
  Eye,
  Edit3,
  Store,
  Package,
  Tag,
  GripVertical,
  Save,
} from "lucide-react";

type Mode = "edit" | "preview";

export function MenuEditor() {
  const [menu, setMenu] = useState<MenuData>(initialMenu);
  const [mode, setMode] = useState<Mode>("edit");
  const { toast } = useToast();

  // Hydrate from localStorage after mount. This is an intentional
  // one-time external-store sync — the eslint rule is disabled for this line
  // because the data lives in localStorage (a client-only external store).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenu(loadMenu());
  }, []);

  // Persist on every change
  const persist = useCallback((next: MenuData) => {
    setMenu(next);
    saveMenu(next);
  }, []);

  // ===== Restaurant header edits =====
  const updateHeader = (field: keyof MenuData, value: string) => {
    persist({ ...menu, [field]: value });
  };

  // ===== Category operations =====
  const addCategory = () => {
    const newCat: MenuCategory = {
      id: genId("cat"),
      nameAr: "قسم جديد",
      nameEn: "",
      items: [],
    };
    persist({ ...menu, categories: [...menu.categories, newCat] });
    toast({ title: "تمت إضافة قسم جديد", description: "عدّل الاسم والأصناف بالأسفل." });
  };

  const updateCategory = (catId: string, field: keyof MenuCategory, value: string) => {
    persist({
      ...menu,
      categories: menu.categories.map((c) =>
        c.id === catId ? { ...c, [field]: value } : c
      ),
    });
  };

  const deleteCategory = (catId: string) => {
    persist({
      ...menu,
      categories: menu.categories.filter((c) => c.id !== catId),
    });
    toast({ title: "تم حذف القسم" });
  };

  // ===== Item operations =====
  const addItem = (catId: string) => {
    const newItem: MenuItem = {
      id: genId("item"),
      nameAr: "صنف جديد",
      nameEn: "",
      price: 0,
      unit: "ج.م",
    };
    persist({
      ...menu,
      categories: menu.categories.map((c) =>
        c.id === catId ? { ...c, items: [...c.items, newItem] } : c
      ),
    });
  };

  const updateItem = (
    catId: string,
    itemId: string,
    field: keyof MenuItem,
    value: string | number | boolean
  ) => {
    persist({
      ...menu,
      categories: menu.categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              items: c.items.map((it) =>
                it.id === itemId ? { ...it, [field]: value } : it
              ),
            }
          : c
      ),
    });
  };

  const deleteItem = (catId: string, itemId: string) => {
    persist({
      ...menu,
      categories: menu.categories.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.filter((it) => it.id !== itemId) }
          : c
      ),
    });
  };

  // ===== Bulk actions =====
  const handleReset = () => {
    const fresh = resetMenu();
    setMenu(fresh);
    toast({
      title: "تمت الاستعادة",
      description: "رجع المنيو للنسخة الأصلية.",
    });
  };

  const handlePrint = () => {
    setMode("preview");
    // Give React a tick to render the preview, then call print
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const handleSave = () => {
    saveMenu(menu);
    toast({ title: "تم الحفظ", description: "تم حفظ المنيو في المتصفح." });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-rose-50/40 to-white">
      {/* ===== Top bar ===== */}
      <header
        className="sticky top-0 z-40 border-b border-rose-200/60 backdrop-blur"
        style={{ background: "rgba(255,255,255,0.85)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-full text-white shrink-0"
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg, #a52855 0%, #7a1335 100%)",
              }}
            >
              <Store size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight" style={{ color: "#7a1335" }}>
                محرر منيو {menu.restaurantNameAr}
              </h1>
              <p className="text-xs text-muted-foreground">
                عدّل الأصناف والأسعار ثم اطبع PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
              <TabsList className="bg-rose-100/60">
                <TabsTrigger value="edit" className="gap-1.5">
                  <Edit3 size={14} /> تحرير
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-1.5">
                  <Eye size={14} /> معاينة
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className="gap-1.5"
            >
              <Save size={14} /> حفظ
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <RotateCcw size={14} /> استعادة
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>استعادة المنيو الأصلي؟</AlertDialogTitle>
                  <AlertDialogDescription>
                    هذا سيحذف كل التعديلات والأصناف المضافة ويرجّع المنيو للنسخة الأولى.
                    ما ينفعش ترجع التعديلات بعدها.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    نعم، استعد
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 text-white"
              style={{ background: "#7a1335" }}
            >
              <Printer size={14} /> طباعة / حفظ PDF
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Main content ===== */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
        {mode === "edit" ? (
          <div className="space-y-6">
            {/* Restaurant info card */}
            <Card className="border-rose-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base" style={{ color: "#7a1335" }}>
                  <Tag size={16} /> بيانات المطعم
                </CardTitle>
                <CardDescription>
                  عدّل اسم المطعم والوصف ورقم الهاتف اللي هتظهر في المنيو المطبوع.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name-ar">الاسم بالعربي</Label>
                  <Input
                    id="name-ar"
                    value={menu.restaurantNameAr}
                    onChange={(e) => updateHeader("restaurantNameAr", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="name-en">الاسم بالإنجليزي</Label>
                  <Input
                    id="name-en"
                    value={menu.restaurantNameEn}
                    onChange={(e) => updateHeader("restaurantNameEn", e.target.value)}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="tagline-ar">الوصف / الجملة (عربي)</Label>
                  <Textarea
                    id="tagline-ar"
                    value={menu.taglineAr}
                    onChange={(e) => updateHeader("taglineAr", e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
                  <Input
                    id="phone"
                    value={menu.phone || ""}
                    onChange={(e) => updateHeader("phone", e.target.value)}
                    placeholder="مثال: 01000000000"
                    dir="ltr"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact & Social media card (cover + closing pages) */}
            <Card className="border-rose-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base" style={{ color: "#7a1335" }}>
                  <Tag size={16} /> السوشيال ميديا (صفحة الغلاف والأخيرة)
                </CardTitle>
                <CardDescription>
                  دي المعلومات اللي هتظهر في صفحة الغلاف (الأولى) و الصفحة الأخيرة من الـ PDF.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="instagram" className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white" style={{ width: 18, height: 18 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /></svg>
                    </span>
                    إنستجرام (اسم الحساب)
                  </Label>
                  <Input
                    id="instagram"
                    value={menu.instagram || ""}
                    onChange={(e) => updateHeader("instagram", e.target.value)}
                    placeholder="rose_sweets"
                    dir="ltr"
                  />
                  <p className="text-xs text-muted-foreground">
                    هيتحول لرابط: instagram.com/الحساب — يتفتح لما تضغط عليه في PDF
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="whatsapp" className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center rounded-full bg-green-500 text-white" style={{ width: 18, height: 18 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.5.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>
                    </span>
                    واتساب (الرقم)
                  </Label>
                  <Input
                    id="whatsapp"
                    value={menu.whatsapp || ""}
                    onChange={(e) => updateHeader("whatsapp", e.target.value)}
                    placeholder="01278187473"
                    dir="ltr"
                  />
                  <p className="text-xs text-muted-foreground">
                    هيتحول لرابط: wa.me/الرقم — يفتح محادثة واتساب لما تضغط عليه
                  </p>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="closing-quote-ar">جملة الصفحة الأخيرة (عربي)</Label>
                  <Textarea
                    id="closing-quote-ar"
                    value={menu.closingQuoteAr || ""}
                    onChange={(e) => updateHeader("closingQuoteAr", e.target.value)}
                    rows={2}
                    placeholder="تناول الطعام ضرورة، لكن تناوله بذكاء فن"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="closing-quote-en">جملة الصفحة الأخيرة (إنجليزي)</Label>
                  <Textarea
                    id="closing-quote-en"
                    value={menu.closingQuoteEn || ""}
                    onChange={(e) => updateHeader("closingQuoteEn", e.target.value)}
                    rows={2}
                    dir="ltr"
                    placeholder="TO EAT IS A NECESSITY, BUT TO EAT INTELLIGENTLY IS AN ART"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Package size={18} style={{ color: "#7a1335" }} />
                <h2 className="text-base font-bold" style={{ color: "#7a1335" }}>
                  أقسام المنيو
                </h2>
                <Badge variant="secondary" className="bg-rose-100 text-rose-800">
                  {menu.categories.length} قسم
                </Badge>
              </div>
              <Button
                onClick={addCategory}
                size="sm"
                variant="outline"
                className="gap-1.5 border-rose-300 text-rose-800 hover:bg-rose-50"
              >
                <Plus size={14} /> إضافة قسم
              </Button>
            </div>

            {menu.categories.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center text-muted-foreground">
                  مفيش أقسام لسه. اضغط «إضافة قسم» فوق عشان تبدأ.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {menu.categories.map((cat, idx) => (
                  <CategoryEditor
                    key={cat.id}
                    category={cat}
                    index={idx}
                    onCategoryChange={updateCategory}
                    onCategoryDelete={deleteCategory}
                    onItemAdd={addItem}
                    onItemChange={updateItem}
                    onItemDelete={deleteItem}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              دي معاينة المنيو اللي هيطبع. اضغط «طباعة / حفظ PDF» فوق لتحفظه PDF.
            </div>
            <div className="shadow-xl rounded-lg overflow-hidden border border-rose-200">
              <MenuPreview menu={menu} />
            </div>
          </div>
        )}
      </main>

      {/* ===== Footer ===== */}
      <footer
        className="border-t border-rose-200/60 py-4 text-center text-xs text-muted-foreground"
        style={{ background: "rgba(255,250,252,0.6)" }}
      >
        © {menu.restaurantNameAr} — جميع البيانات بتتحفظ محلياً في متصفحك.
      </footer>

      <Toaster />
    </div>
  );
}

// ===== Category editor sub-component =====
interface CategoryEditorProps {
  category: MenuCategory;
  index: number;
  onCategoryChange: (catId: string, field: keyof MenuCategory, value: string) => void;
  onCategoryDelete: (catId: string) => void;
  onItemAdd: (catId: string) => void;
  onItemChange: (
    catId: string,
    itemId: string,
    field: keyof MenuItem,
    value: string | number | boolean
  ) => void;
  onItemDelete: (catId: string, itemId: string) => void;
}

function CategoryEditor({
  category,
  index,
  onCategoryChange,
  onCategoryDelete,
  onItemAdd,
  onItemChange,
  onItemDelete,
}: CategoryEditorProps) {
  return (
    <Card className="border-rose-200">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-2">
          <div
            className="flex items-center justify-center rounded-md text-white text-xs font-bold shrink-0"
            style={{
              width: 28,
              height: 28,
              background: "#7a1335",
              marginTop: 2,
            }}
          >
            {index + 1}
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">اسم القسم (عربي)</Label>
              <Input
                value={category.nameAr}
                onChange={(e) => onCategoryChange(category.id, "nameAr", e.target.value)}
                className="font-bold"
                style={{ color: "#7a1335" }}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">الاسم (إنجليزي)</Label>
              <Input
                value={category.nameEn || ""}
                onChange={(e) => onCategoryChange(category.id, "nameEn", e.target.value)}
                dir="ltr"
                placeholder="CHEESE CAKE"
              />
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-50 hover:text-red-600 shrink-0"
                title="حذف القسم"
              >
                <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>حذف القسم؟</AlertDialogTitle>
                <AlertDialogDescription>
                  هتخسر كل الأصناف جوه القسم ده ({category.items.length} صنف). ما ينفعش ترجع.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onCategoryDelete(category.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <Separator className="bg-rose-100" />
      <CardContent className="pt-3">
        {category.items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            مفيش أصناف في القسم ده. اضغط «إضافة صنف».
          </p>
        ) : (
          <div className="space-y-2">
            {/* Table header (desktop only) */}
            <div className="hidden md:grid grid-cols-12 gap-2 text-xs text-muted-foreground px-2 pb-1">
              <div className="col-span-4">الاسم بالعربي</div>
              <div className="col-span-3">الاسم بالإنجليزي</div>
              <div className="col-span-2">السعر</div>
              <div className="col-span-2">الوحدة</div>
              <div className="col-span-1 text-center">إجراء</div>
            </div>

            {category.items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                onItemChange={(field, value) =>
                  onItemChange(category.id, item.id, field, value)
                }
                onItemDelete={() => onItemDelete(category.id, item.id)}
              />
            ))}
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onItemAdd(category.id)}
          className="mt-3 gap-1.5 w-full border-dashed border-rose-300 text-rose-800 hover:bg-rose-50"
        >
          <Plus size={14} /> إضافة صنف
        </Button>
      </CardContent>
    </Card>
  );
}

// ===== Item row sub-component =====
interface ItemRowProps {
  item: MenuItem;
  onItemChange: (field: keyof MenuItem, value: string | number | boolean) => void;
  onItemDelete: () => void;
}

function ItemRow({ item, onItemChange, onItemDelete }: ItemRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-rose-50/30 rounded-md p-2 hover:bg-rose-50/60 transition-colors">
      {/* Name Arabic */}
      <div className="md:col-span-4">
        <Input
          value={item.nameAr}
          onChange={(e) => onItemChange("nameAr", e.target.value)}
          placeholder="اسم الصنف"
          className="h-8 text-sm"
        />
      </div>
      {/* Name English */}
      <div className="md:col-span-3">
        <Input
          value={item.nameEn || ""}
          onChange={(e) => onItemChange("nameEn", e.target.value)}
          placeholder="Name (EN)"
          dir="ltr"
          className="h-8 text-sm"
        />
      </div>
      {/* Price */}
      <div className="md:col-span-2">
        <Input
          type="number"
          value={item.price || ""}
          onChange={(e) =>
            onItemChange("price", e.target.value === "" ? 0 : Number(e.target.value))
          }
          placeholder="0"
          className="h-8 text-sm font-bold"
          style={{ color: "#7a1335" }}
        />
      </div>
      {/* Unit */}
      <div className="md:col-span-2">
        <Input
          value={item.unit || ""}
          onChange={(e) => onItemChange("unit", e.target.value)}
          placeholder="ج.م"
          className="h-8 text-sm"
        />
      </div>
      {/* Actions */}
      <div className="md:col-span-1 flex items-center justify-center gap-1">
        <label className="flex items-center gap-1 text-[10px] text-muted-foreground cursor-pointer whitespace-nowrap" title="ملاحظة بدون سعر">
          <input
            type="checkbox"
            checked={!!item.isInfo}
            onChange={(e) => onItemChange("isInfo", e.target.checked)}
            className="h-3 w-3"
          />
          ملاحظة
        </label>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-red-500 hover:bg-red-50"
          onClick={onItemDelete}
          title="حذف الصنف"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
}
