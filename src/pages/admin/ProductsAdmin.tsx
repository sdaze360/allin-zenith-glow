import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { AppleButton } from '@/components/ui/AppleButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Package, 
  Plus, 
  PencilSimple, 
  Trash, 
  Upload,
  X,
  Check
} from 'phosphor-react';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, isDemoMode } from '@/lib/firebase';

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  icon: string;
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [icon, setIcon] = useState('Package');

  useEffect(() => {
    // Realtime listener so admin sees current products immediately
    const productsCollection = collection(db, 'products');
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsList);
      setLoading(false);
    }, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      setProducts(productsList);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch products.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setIcon('Package');
    setImageFile(null);
    setImagePreview('');
    setCurrentProduct(null);
    setIsEditing(false);
  };

  const openModal = (product?: Product) => {
    if (product) {
      setIsEditing(true);
      setCurrentProduct(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setIcon(product.icon || 'Package');
      if (product.image) {
        setImagePreview(product.image);
      }
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Require an image when adding a new product
      if (!isEditing && !imageFile) {
        toast({
          variant: 'destructive',
          title: 'Image required',
          description: 'Please upload an image for the product before saving.',
        });
        return;
      }
      let imageUrl = currentProduct?.image || '';

      // Resolve image URL
      if (imageFile) {
        if (isDemoMode) {
          // In demo mode, use the local preview URL (no upload)
          imageUrl = imagePreview;
        } else {
          // Upload to Firebase Storage
          const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
          await uploadBytes(storageRef, imageFile);
          imageUrl = await getDownloadURL(storageRef);
        }
      }
      
      if (isDemoMode) {
        // In demo mode, simulate create/update in local state
        if (isEditing && currentProduct) {
          setProducts(prev => prev.map(p => p.id === currentProduct.id ? {
            ...currentProduct,
            name,
            description,
            price,
            icon,
            image: imageUrl || currentProduct.image,
          } : p));
          toast({ title: 'Success', description: 'Product updated (demo mode).' });
        } else {
          const newProduct: Product = {
            id: `demo-${Date.now()}`,
            name,
            description,
            price,
            icon,
            image: imageUrl,
          } as Product;
          setProducts(prev => [newProduct, ...prev]);
          toast({ title: 'Success', description: 'Product added (demo mode).' });
        }
      } else if (isEditing && currentProduct) {
        // Update existing product
        const productRef = doc(db, 'products', currentProduct.id);
        await updateDoc(productRef, {
          name,
          description,
          price,
          icon,
          image: imageUrl,
        });
        
        toast({
          title: 'Success',
          description: 'Product updated successfully.',
        });
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          name,
          description,
          price,
          icon,
          image: imageUrl,
        });
        
        toast({
          title: 'Success',
          description: 'Product added successfully.',
        });
      }
      
      closeModal();
      if (!isDemoMode) {
        fetchProducts();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: isEditing ? 'Failed to update product.' : 'Failed to add product.',
      });
    }
  };

  const handleDelete = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        // Delete the document from Firestore
        await deleteDoc(doc(db, 'products', product.id));
        
        // Delete the image from Storage if it exists
        if (product.image) {
          try {
            const imageRef = ref(storage, product.image);
            await deleteObject(imageRef);
          } catch (error) {
            console.error('Error deleting image:', error);
          }
        }
        
        toast({
          title: 'Success',
          description: 'Product deleted successfully.',
        });
        
        fetchProducts();
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete product.',
        });
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Products Management
          </span>
        </h1>
        
        <AppleButton
          onClick={() => openModal()}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </AppleButton>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <GlassCard className="col-span-full p-12 text-center">
              <Package size={48} className="mx-auto text-muted-foreground mb-4" weight="light" />
              <h3 className="text-xl font-medium mb-2">No Products Yet</h3>
              <p className="text-muted-foreground mb-6">
                Get started by adding your first product.
              </p>
              <AppleButton
                onClick={() => openModal()}
                className="flex items-center gap-2 mx-auto"
              >
                <Plus size={16} />
                Add Product
              </AppleButton>
            </GlassCard>
          ) : (
            products.map((product) => (
              <GlassCard key={product.id} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted/20 flex items-center justify-center">
                      <Package size={48} className="text-muted-foreground" weight="light" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <AppleButton
                      size="sm"
                      variant="secondary"
                      onClick={() => openModal(product)}
                    >
                      <PencilSimple size={16} />
                    </AppleButton>
                    <AppleButton
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash size={16} />
                    </AppleButton>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                <p className="text-primary font-light mb-2">{product.price}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </GlassCard>
            ))
          )}
        </div>
      )}
      
      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {isEditing ? 'Edit Product' : 'Add New Product'}
                </span>
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Premium Brand Tee"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ultra-soft cotton blend with embroidered logo..."
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="$45"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Product Image <span className="text-destructive">*</span></Label>
                <div className="relative border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload size={32} className="mx-auto text-muted-foreground mb-2" weight="light" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop an image, or <span className="text-primary">browse</span>
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload product image"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <AppleButton
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </AppleButton>
                <AppleButton
                  type="submit"
                  className="flex items-center gap-2"
                >
                  <Check size={16} />
                  {isEditing ? 'Update Product' : 'Add Product'}
                </AppleButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </AdminLayout>
  );
}